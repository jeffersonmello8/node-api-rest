const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/', (req, res, next) => {

    mysql.getConnection((error, conn) =>{
        if (error) { return res.status(500).send({ error: error})}

        conn.query(
            'SELECT * FROM produtos',
            (error, resultado, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ mensagem: 'Ocorreu um erro :/', error: error})}

                return res.status(200).send({response: resultado})
            }
        )
    });
});

router.get('/:id_produto', (req, res, next) => {
    
    mysql.getConnection((error, conn) =>{
        if (error) { return res.status(500).send({ error: error})}

        conn.query(
            'SELECT * FROM produtos WHERE id_produto = ?',
            [req.params.id_produto],
            (error, resultado, fields) => {
                conn.release();
                
                if (error) { return res.status(500).send({ mensagem: 'Ocorreu um erro :/', error: error})}
                return res.status(200).send({response: resultado})
            }
        )
    });
});

router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error})}
        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?,?)',
            [req.body.nome, req.body.preco],
            (error, resultado, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ mensagem: 'Ocorreu um erro :/', error: error})}

                res.status(201).send({
                    mensagem: 'Produto inserido com sucesso',
                    id_produto: resultado.insertId
                });
            }
        )
    });
});

router.patch('/', (req, res, next) => {
    
    mysql.getConnection((error, conn) =>{
        if (error) { return res.status(500).send({ error: error})}

        conn.query(
            `UPDATE produtos
                SET nome        = ?,
                    preco       = ?
              WHERE id_produto  = ?`,
            [req.body.nome, req.body.preco, req.body.id_produto],
            (error, resultado, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ mensagem: 'Ocorreu um erro :/', error: error})}

                return res.status(202).send({
                    mensagem: 'Produto atualizado com sucesso'
                })
            }
        )
    });
});

router.delete('/', (req, res, next) => {
    
    mysql.getConnection((error, conn) =>{
        if (error) { return res.status(500).send({ error: error})}

        conn.query(
            'DELETE FROM produtos WHERE id_produto = ?',
            [req.body.id_produto],
            (error, resultado, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ mensagem: 'Ocorreu um erro :/', error: error})}

                return res.status(202).send({
                    mensagem: 'Produto removido com sucesso'
                })
            }
        )
    });
});

module.exports = router;