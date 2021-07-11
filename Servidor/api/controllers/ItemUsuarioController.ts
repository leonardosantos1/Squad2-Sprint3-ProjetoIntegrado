import database from '../models'
import {Request, Response} from 'express'
const logger = require('../config/logger')
import retornos = require('./retornosController')
const {dataConversor} = require('../utils/dataConversor')

class ItemUsuario {
    async listarItensUsuario(req:Request,res:Response) {
        try {
            const itensUsu = await database.item_usuario.findAll({attributes:["id", "itemId", "usuarioId"]})
            logger.log('info', `Requisicao GET /itemUsuario/`)
            return res.status(200).json(retornos.retornos(true,'Listar itemUsuarios',itensUsu))
        } catch (error:any) {
            logger.error(`ERRO - Requisicao GET /itemUsuario/. Erro:${error.message}`, 'error')
            return res.status(400).json(retornos.retornos(false,'Listar itemUsuarios',{ erro: "Desculpe, mas nao foi possivel listar os itens usuarios!" }))
        }
    }
    async listarItemUsuario(req:Request,res:Response) {
        try {
            const itemUsu = await database.item_usuario.findByPk(req.params.id)
            logger.log('info', `Requisicao GET /itemUsuario/${req.params.id}`)
            return res.status(200).json(retornos.retornos(true,'Listar itemUsuario',{ id: itemUsu.id, itemId: itemUsu.itemId, usuarioId: itemUsu.usuarioId }))
        } catch (error:any) {
            logger.error(`ERRO - Requisicao GET /itemUsuario/${req.params.id}. Erro:${error.message}`, 'error')
            return res.status(400).json(retornos.retornos(false,'Listar itemUsuario',{ erro: "Desculpe, mas nao foi possivel listar o item usuario desejado!" }))
        }
    }
    async inserirItemUsuario(req:Request,res:Response) {
        try {
            if (req.is('json')) {
                req.body.usuarioId = req.headers.userId
                const itemUsu = await database.item_usuario.create(req.body)
                logger.log('info', `Requisicao POST /itemUsuario/ NOVO:usuarioId:${req.headers.userId}, itemId:${req.body.itemId} FROM: id:${req.headers.userId} nome:${req.headers.userNome}`)
                if(req.body.dataReserva && req.body.checkout){
                    req.body.dataReserva = dataConversor(req.body.dataReserva)
                    req.body.checkout = dataConversor(req.body.checkout)
                    const reserva = await database.Reserva.create({itemUsuarioId: itemUsu.id, dataReserva: req.body.dataReserva, checkout: req.body.checkout})
                    logger.log('info', `Requisicao POST /reserva/ NOVO:itemUsuarioId:${reserva.id}, dataReserva:${req.body.dataReserva}, checkout:${req.body.checkout}  FROM: id:${req.headers.userId} nome:${req.headers.userNome}`)
                }
                return res.status(201).json(retornos.retornos(true,'Inserir itemUsuario',{ id: itemUsu.id, itemId: itemUsu.itemId, usuarioId: itemUsu.usuarioId }))   
            } else {
                throw new Error("Desculpe, mas nao foi possivel inserir o item usuario desejado!")
            }
        } catch (error:any) {
            logger.error(`ERRO - Requisicao POST /itemUsuario/ . Erro:${error.message} FROM: id:${req.headers.userId} nome:${req.headers.userNome}`, 'error')
            return res.status(400).json(retornos.retornos(false,'Inserir itemUsuario',{ erro: "Desculpe, mas nao foi possivel inserir o item usuario desejado!" }))
        }
    }
    async atualizarItemUsuario(req:Request,res:Response) {
        try {
            if (req.is('json')) {
                const itemUsu = await database.item_usuario.findByPk(req.params.id)
                const itemUsoAntigo = itemUsu
                await itemUsu.update(req.body)
                logger.log('info', `Requisicao PUT /itemUsuario/${req.params.id} Atualizou: usuarioId:${itemUsoAntigo.usuarioId} itemId:${itemUsoAntigo.itemId}  para usuarioId:${itemUsu.usuarioId} itemId:${itemUsu.itemId} FROM: id:${req.headers.userId} nome:${req.headers.userNome}`)
                res.status(200).json(retornos.retornos(true,'Atualizar itemUsuario',{ id: itemUsu.id, itemId: itemUsu.itemId, usuarioId: itemUsu.usuarioId }))
            } else {
                throw new Error("Desculpe, mas nao foi possivel atualizar o item usuario desejado!")
            }
        } catch (error:any) {
            logger.error(`ERRO - Requisicao PUT /itemUsuario/${req.params.id} . Erro:${error.message} FROM: id:${req.headers.userId} nome:${req.headers.userNome}`, 'error')
            return res.status(400).json(retornos.retornos(false,'Atualizar itemUsuario',{ erro: "Desculpe, mas nao foi possivel atualizar o item usuario desejado!" }))
        }
    }
    async deletarItemUsuario(req:Request,res:Response) {
        try {
            const itemUsu = await database.item_usuario.findByPk(req.params.id)
            await itemUsu.destroy(req.body)
            logger.log('info', `Requisicao DELETE /itemUsuario/${req.params.id} FROM: id:${req.headers.userId} nome:${req.headers.userNome}`)
            return res.status(200).json(retornos.retornos(true,'Deletar itemUsuario',{id: itemUsu.id, itemId: itemUsu.itemId, usuarioId: itemUsu.usuarioId}))
        } catch (error:any) {
            logger.error(`ERRO - Requisicao DELETE /itemUsuario/${req.params.id} . Erro:${error.message} FROM: id:${req.headers.userId} nome:${req.headers.userNome}`, 'error')
            return res.status(400).json(retornos.retornos(false,'Deletar itemUsuario',{ erro: "Desculpe, mas nao foi possivel deletar o item usuario desejado!" }))
        }
    }
}
export default new ItemUsuario()
