const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorna todos os pedidos'
    });
});

router.get('/:id_pedido', (req, res, next) => {
    const id = req.params.id_pedido;
    res.status(200).send({
        id: id,
        mensagem: 'Retorna detalhes de um pedido específico'
    });
});

router.post('/', (req, res, next) => {

    const pedido = {
        id_produto: req.body.id_produto,
        quantidade: req.body.quantidade
    }

    res.status(201).send({
        mensagem: 'Insere um pedido',
        pedidoCriado: pedido
    });
});

router.delete('/', (req, res, next) => {
    res.status(204).send({
        mensagem: 'Deleta um pedido'
    });
});

module.exports = router;