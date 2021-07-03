import database from '../models'
const logger = require('../config/logger')

module.exports = {
    async listarItensUsuario(req, res) {
        try {
            const itensUsu = await database.item_usuario.findAll()
            logger.log('info', `Requisicao GET /itemUsuario/`)
            return res.status(200).json(trataItensUsuario(itensUsu))
        } catch (error) {
            logger.error(`ERRO - Requisicao GET /itemUsuario/. Erro:${error.message}`, 'error')
            return res.status(400).json({ erro: "Desculpe, mas nao foi possivel listar os itens usuarios!" })
        }
    },
    async listarItemUsuario(req, res) {
        try {
            const itemUsu = await database.item_usuario.findByPk(req.params.id)
            logger.log('info', `Requisicao GET /itemUsuario/${req.params.id}`)
            return res.status(200).json({ id: itemUsu.id, itemId: itemUsu.itemId, usuarioId: itemUsu.usuarioId })
        } catch (error) {
            logger.error(`ERRO - Requisicao GET /itemUsuario/${req.params.id}. Erro:${error.message}`, 'error')
            return res.status(400).json({ erro: "Desculpe, mas nao foi possivel listar o item usuario desejado!" })
        }
    },
    async inserirItemUsuario(req, res) {
        try {
            if (req.is('json')) {
                const itemUsu = await database.item_usuario.create(req.body)
                logger.log('info', `Requisicao POST /itemUsuario/ NOVO:usuarioId:${req.body.usuarioId}, itemId:${req.body.itemId} FROM: id:${req.headers.userId} nome:${req.headers.userNome}`)
                return res.status(201).json({ id: itemUsu.id, itemId: itemUsu.itemId, usuarioId: itemUsu.usuarioId })
            } else {
                throw new Error("Desculpe, mas nao foi possivel inserir o item usuario desejado!")
            }
        } catch (error) {
            logger.error(`ERRO - Requisicao POST /itemUsuario/ . Erro:${error.message} FROM: id:${req.headers.userId} nome:${req.headers.userNome}`, 'error')
            return res.status(400).json({ erro: "Desculpe, mas nao foi possivel inserir o item usuario desejado!" })
        }
    },
    async atualizarItemUsuario(req, res) {
        try {
            if (req.is('json')) {
                const itemUsu = await database.item_usuario.findByPk(req.params.id)
                const itemUsoAntigo = itemUsu
                await itemUsu.update(req.body)
                logger.log('info', `Requisicao PUT /itemUsuario/${req.params.id} Atualizou: usuarioId:${itemUsoAntigo.usuarioId} itemId:${itemUsoAntigo.itemId}  para usuarioId:${itemUsu.usuarioId} itemId:${itemUsu.itemId} FROM: id:${req.headers.userId} nome:${req.headers.userNome}`)
                res.status(200).json({ id: itemUsu.id, itemId: itemUsu.itemId, usuarioId: itemUsu.usuarioId })
            } else {
                throw new Error("Desculpe, mas nao foi possivel atualizar o item usuario desejado!")
            }
        } catch (error) {
            logger.error(`ERRO - Requisicao PUT /itemUsuario/${req.params.id} . Erro:${error.message} FROM: id:${req.headers.userId} nome:${req.headers.userNome}`, 'error')
            return res.status(400).json({ erro: "Desculpe, mas nao foi possivel atualizar o item usuario desejado!" })
        }
    },
    async deletarItemUsuario(req, res) {
        try {
            const itemUsu = await database.item_usuario.findByPk(req.params.id)
            await itemUsu.destroy(req.body)
            logger.log('info', `Requisicao DELETE /itemUsuario/${req.params.id} FROM: id:${req.headers.userId} nome:${req.headers.userNome}`)
            return res.status(200).json({ msg: "Item usuario deletado com sucesso" })
        } catch (error) {
            logger.error(`ERRO - Requisicao DELETE /itemUsuario/${req.params.id} . Erro:${error.message} FROM: id:${req.headers.userId} nome:${req.headers.userNome}`, 'error')
            return res.status(400).json({ erro: "Desculpe, mas nao foi possivel deletar o item usuario desejado!" })
        }
    }
}

function trataItensUsuario(arr) {
    let itensUsuario = [];
    for (let i = 0; i < arr.length; i++) {
        itensUsuario.push({ id: arr[i].id, itemId: arr[i].itemId, usuario_id: arr[i].usuarioId })
    }
    return itensUsuario
}