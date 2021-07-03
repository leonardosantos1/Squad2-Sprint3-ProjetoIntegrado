import database from '../models'
import {Request,Response} from 'express'
const logger = require('../config/logger')

class TipoController {
    async listarTipos(req:Request,res:Response){
        try{
            const tipos = await database.Tipo.findAll()
            logger.log('info',`Requisicao GET /tipo/`)
            return res.status(200).json(trataTipos(tipos))
        }catch(error: any){
            logger.error(`ERRO - Requisicao GET /tipo/. Erro:${error.message}`,'error')
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel listar os tipos!"})
        }
    }
    async listarTipo(req:Request,res:Response){
        try{
            const tipo = await database.Tipo.findByPk(req.params.id)
            logger.log('info',`Requisicao GET /tipo/${req.params.id}`)
            return res.status(200).json({id:tipo.id, categoria:tipo.categoria})
        }catch(error: any){
            logger.error(`ERRO - Requisicao GET /tipo/${req.params.id}. Erro:${error.message}`,'error')
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel listar o tipo desejado!"})
        }
    }
    async inserirTipo(req:Request,res:Response){
        try{
            if(req.is('json')){
                const tipo = await database.Tipo.create(req.body)
                logger.log('info',`Requisicao POST /tipo/ NOVO:${req.body.categoria} FROM: id:${req.headers.userId} nome:${req.headers.userNome}`)
                return res.status(201).json({id:tipo.id, categoria:tipo.categoria})
            }else{
                throw new Error ("Desculpe, mas nao foi possivel inserir um novo tipo!")
            } 
        }catch(error: any){
            logger.error(`ERRO - Requisicao POST /tipo/ . Erro:${error.message} FROM: id:${req.headers.userId} nome:${req.headers.userNome}`,'error')
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel inserir um novo tipo!"})
        }
    }
    async atualizarTipo(req:Request,res:Response){
        try{
            if(req.is('json')){
                const tipo = await database.Tipo.findByPk(req.params.id)
                const tipoCategoria = tipo.categoria
                await tipo.update(req.body)
                logger.log('info',`Requisicao PUT /tipo/${req.params.id} Atualizou:${tipoCategoria} PARA:${req.body.categoria} FROM: id:${req.headers.userId} nome:${req.headers.userNome}`)
                res.status(200).json({id:tipo.id, categoria:tipo.categoria})
            }else{
                logger.error(`ERRO - Requisicao PUT /tipo/${req.params.id} . Erro:Formato invalido FROM: id:${req.headers.userId} nome:${req.headers.userNome}`,'error')
                throw new Error("Desculpe, mas nao foi possivel atualizar o tipo desejado!")
            }
        }catch(error: any){
            logger.error(`ERRO - Requisicao PUT /tipo/${req.params.id} . Erro:${error.message} FROM: id:${req.headers.userId} nome:${req.headers.userNome}`,'error')
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel atualizar o tipo desejado!"})
        }
    }
    async deletarTipo(req:Request,res:Response){
        try{
            const tipo = await database.Tipo.findByPk(req.params.id)
            await tipo.destroy(req.body)
            logger.log('info',`Requisicao DELETE /tipo/${req.params.id} FROM: id:${req.headers.userId} nome:${req.headers.userNome}`)
            return res.status(200).json({msg:"Tipo deletado com sucesso!"})
        }catch(error: any){
            logger.error(`ERRO - Requisicao DELETE /tipo/${req.params.id} . Erro:${error.message} FROM: id:${req.headers.userId} nome:${req.headers.userNome}`,'error')
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel deletar o Tipo!"})
        }
    }
}

export default new TipoController()

function trataTipos(arr:any){
    let tipo = [];
    for(let i:any = 0 ; i < arr.length ; i++){
        tipo.push({id:arr[i].id, categoria:arr[i].categoria})
    }
    return tipo
}
