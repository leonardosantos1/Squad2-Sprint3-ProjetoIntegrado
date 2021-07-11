import database from '../models'
import {Request,Response} from 'express'
const logger = require('../config/logger')
import retornos = require('./retornosController')
const {dataConversor} = require('../utils/dataConversor')

class ReservaController{
    async listarReservas(req:Request,res:Response) {
        try {
            const reservas = await database.Reserva.findAll({attributes:["dataReserva", "checkout", "itemUsuarioId"]})
            logger.log('info', `Requisicao GET /reserva/`)
            return res.status(200).json(retornos.retornos(true,'Listar reservas',reservas))
        } catch (error:any) {
            logger.error(`ERRO - Requisicao GET /reserva/. Erro:${error.message}`, 'error')
            return res.status(400).json(retornos.retornos(false,'Listar reservas',{ erro: "Desculpe, mas nao foi possivel listar as reservas desejada!" }))
        }
    }
    async listarReserva(req:Request,res:Response) {
        try {
            const reserva = await database.Reserva.findByPk(req.params.id)
            logger.log('info', `Requisicao GET /reserva/${req.params.id}`)
            return res.status(200).json(retornos.retornos(true,'Listar reserva',{ dataReserva: reserva.dataReserva, checkout: reserva.checkout, itemUsuarioId: reserva.itemIsuarioId }))
        } catch (error:any) {
            logger.error(`ERRO - Requisicao GET /reserva/${req.params.id}. Erro:${error.message}`, 'error')
            return res.status(400).json(retornos.retornos(false,'Listar reservas',{ erro: "Desculpe, mas nao foi possivel listar a reserva desejada!" }))
        }
    }
    async inserirReserva(req:Request,res:Response) {
        try {
            if (req.is('json')) {
                req.body.dataReserva = dataConversor(req.body.dataReserva)
                req.body.checkout = dataConversor(req.body.checkout)
                const reserva = await database.Reserva.create(req.body)
                logger.log('info', `Requisicao POST /reserva/ NOVO:itemUsuarioId:${req.body.itemUsuarioId}, dataReserva:${req.body.dataReserva}, checkout:${req.body.checkout}  FROM: id:${req.headers.userId} nome:${req.headers.userNome}`)
                return res.status(201).json(retornos.retornos(true,'Inserir reserva',{ dataReserva: reserva.dataReserva, checkout: reserva.checkout, itemUsuarioId: reserva.itemIsuarioId }))
            } else {
                throw new Error("Desculpe, mas nao foi possivel inserir um novo usuario!")
            }
        } catch (error:any) {
            console.log(error.message)
            logger.error(`ERRO - Requisicao POST /reserva/. Erro:${error.message}`, 'error')
            return res.status(400).json(retornos.retornos(false,'Inserir reservas',{ erro: "Desculpe, mas nao foi possivel inserir uma nova reserva!" }))
        }
    }
    async atualizarReserva(req:Request,res:Response) {
        try {
            if (req.is('json')) {
                const reserva = await database.Reserva.findByPk(req.params.id)
                const reservaAntiga = reserva
                await reserva.update(req.body)
                logger.log('info', `Requisicao PUT /reserva/${req.params.id} Atualiza:itemUsuarioId:${reservaAntiga.itemUsuarioId}, dataReserva:${reservaAntiga.dataReserva}, checkout:${reservaAntiga.checkout} PARA: itemUsuarioId:${reserva.itemUsuarioId}, dataReserva:${reserva.dataReserva}, checkout:${reserva.checkout} FROM: id:${req.headers.userId} nome:${req.headers.userNome}`)
                res.status(200).json(retornos.retornos(true,'Atualizar reserva',{ dataReserva: reserva.dataReserva, checkout: reserva.checkout, itemUsuarioId: reserva.itemIsuarioId }))
            } else {
                throw new Error("Desculpe, mas nao foi possivel inserir uma nova reserva!")
            }
        } catch (error:any) {
            logger.error(`ERRO - Requisicao PUT /reserva/${req.params.id} . Erro:${error.message}`, 'error')
            return res.status(400).json(retornos.retornos(false,'Atualizar reservas',{ erro: "Desculpe, mas nao foi possivel inserir uma nova reserva!" }))
        }
    }
    async deletarReserva(req:Request,res:Response) {
        try {
            const reserva = await database.Reserva.findByPk(req.params.id)
            await reserva.destroy(req.body)
            logger.log('info', `Requisicao DELETE /reserva/${req.params.id} FROM: id:${req.headers.userId} nome:${req.headers.userNome}`)
            return res.status(200).json(retornos.retornos(true,'Deletar reserva',reserva))
        } catch (error:any) {
            logger.error(`ERRO - Requisicao DELETE /reserva/${req.params.id} . Erro:${error.message}`, 'error')
            return res.status(400).json(retornos.retornos(false,'Deletar reservas',{ erro: "Desculpe, mas nao foi possivel deletar a reserva desejada!" }))
        }
    }
}

export default new ReservaController()
