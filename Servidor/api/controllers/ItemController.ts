import database from '../models'
import {Request,Response} from 'express'
const logger = require('../config/logger')
import retornos = require('./retornosController')

class ItemController {
    async listarItens(req:Request ,res:Response){
        try{
            const itens = await database.Item.findAll({attributes:["id", "numeracao", "tipoId"]})
            logger.log('info',`Requisicao GET /item/`)
            return res.status(200).json(retornos.retornos(true,'Listar itens',itens))
        }catch(error: any){
            logger.error(`ERRO - Requisicao GET /item/. Erro:${error.message}`,'error')
            return res.status(400).json(retornos.retornos(false,'Listar itens',{erro:'Desculpe mas não foi possivel listar os itens!'}))
        }
    }
    async listarItem(req:Request,res:Response){
        try{
            const item = await database.Item.findByPk(req.params.id)
            logger.log('info',`Requisicao GET /item/${req.params.id}`)
            return res.status(200).json(retornos.retornos(true,'Listar item',{id:item.id, numeracao:item.numeracao, tipoId:item.tipoId}))
        }catch(error: any){
            console.log(error.message)
            logger.error(`ERRO - Requisicao GET /item/${req.params.id}. Erro:${error.message}`,'error')
            return res.status(400).json(retornos.retornos(false,'Listar item',{erro:'Desculpe mas não foi possivel buscar o item!'}))
        }
    }
    async inserirItem(req:Request,res:Response){
        try{
            if(req.is('json')){
                if(req.body.categoria){
                    const tipo = await database.Tipo.findOne({ where: { categoria: req.body.categoria } })
                    req.body.tipoId = tipo.id 
                } 
                const item = await database.Item.create(req.body)
                logger.log('info',`Requisicao POST /item/ NOVO:tipoId:${req.body.tipoId}, Numero:${req.body.numeracao} FROM: id:${req.headers.userId} nome:${req.headers.userNome}`)
                return res.status(201).json(retornos.retornos(true,'Inserir item',{id:item.id, numeracao:item.numeracao, tipoId:item.tipoId}))
            }else{
                throw new Error ("Desculpe mas nao foi possivel inserir um novo item!")
            } 
        }catch(error: any){
            logger.error(`ERRO - Requisicao POST /tipo/ . Erro:${error.message} FROM: id:${req.headers.userId} nome:${req.headers.userNome}`,'error')
            return res.status(400).json(retornos.retornos(false,'Inserir item',{erro:"Desculpe mas nao foi possivel inserir um novo item!"}))
        }
    }
    async atualizarItem(req:Request,res:Response){
        try{
            if(req.is('json')){
                const item = await database.Item.findByPk(req.params.id)
                const itemAntigo = item.numeracao
                await item.update(req.body)
                logger.log('info',`Requisicao PUT /item/${req.params.id} Atualiza numero:${itemAntigo} PARA:${item.numeracao}  FROM: id:${req.headers.userId} nome:${req.headers.userNome}`)
                res.status(200).json(retornos.retornos(true,'Atualizar item',{id:item.id, numeracao:item.numeracao, tipoId:item.tipoId}))
            }else{
                throw new Error("Desculpe mas nao foi possivel atualizar o item desejado!")
            }
        }catch(error: any){
            console.log(error.message)
            logger.error(`ERRO - Requisicao PUT /tipo/${req.params.id} . Erro:${error.message} FROM: id:${req.headers.userId} nome:${req.headers.userNome}`,'error')
            return res.status(400).json(retornos.retornos(false,'Atualizar item',{erro:"Desculpe mas nao foi possivel atualizar o item desejado!"}))
        }
    }
    async deletarItem(req:Request,res:Response){
        try{
            const item = await database.Item.findByPk(req.params.id)
            await item.destroy(req.body)
            logger.log('info',`Requisicao DELETE /item/${req.params.id} FROM: id:${req.headers.userId} nome:${req.headers.userNome}`)
            return res.status(200).json(retornos.retornos(true,'Deletar item',item))
        }catch(error: any){
            logger.error(`ERRO - Requisicao PUT /tipo/${req.params.id} . Erro:${error.message} FROM: id:${req.headers.userId} nome:${req.headers.userNome}`,'error')
            return res.status(400).json(retornos.retornos(false,'Deletar item',{erro:"Desculpe mas nao foi possivel deletar o item desejado!"}))
        }
    }
}
export default new ItemController()

