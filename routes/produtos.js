const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorna todos os produtos'
    });
});

router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto;
    res.status(200).send({
        id: id,
        mensagem: 'Retorna detalhes de um produto específico'
    });
});

router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?,?)',
            [req.body.nome, req.body.preco],
            (error, resultado, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        mensagem: 'Ocorreu um erro :/',
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    mensagem: 'Produto inserido com sucesso',
                    id_produto: resultado.insertId
                });
            }
        )
    });
});

router.patch('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Atualiza um produto'
    });
});

router.delete('/', (req, res, next) => {
    res.status(204).send({
    });
});

module.exports = router;