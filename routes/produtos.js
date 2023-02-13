const express = require('express');
const router = express.Router();

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

    const produto = {
        nome: req.body.nome,
        preco: req.body.preco
    }

    res.status(201).send({
        mensagem: 'Insere um novo produto',
        produtoCriado: produto
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