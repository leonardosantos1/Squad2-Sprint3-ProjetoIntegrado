import database from '../models'
import {Request,Response} from 'express'
const senhaHash = require('../estrategiaLogin/senhaHashController')
const logger = require('../config/logger')
import retornos = require('./retornosController')
import {cpf} from 'cpf-cnpj-validator'

class UsuarioController{

    async listarUsuarios(req:Request,res:Response){
        try{
            const usuarios = await database.Usuario.findAll({attributes:["nome", "cpf"]})
            logger.log('info',`Requisicao GET /usuarios`)
            return res.status(200).json(retornos.retornos(true,'Listar usuarios',usuarios))
        }catch(error: any){
            logger.error(`ERRO - Requisicao GET /usuarios. Erro:${error}`,'error')
            return res.status(400).json(retornos.retornos(false,'Listar usuarios',{erro:"Desculpe, mas nao foi possivel listar os usuarios!"}))
        }
    }
    async listarUsuario(req:Request,res:Response){
        try{
            const usuario = await database.Usuario.findByPk(req.params.id)
            logger.log('info',`Requisicao GET /usuarios/${req.params.id}  FROM: id:${req.headers.userId} nome:${req.headers.userNome}`)
            return res.status(200).json(retornos.retornos(true,'Listar usuario',{id:usuario.id, nome:usuario.nome, cpf:usuario.cpf}))
        }catch(error: any){ 
            logger.error(`ERRO - Requisicao GET /usuarios/${req.params.id}  FROM: id:${req.headers.userId} nome:${req.headers.userNome}. Erro: ${error.message}`,'error')
            return res.status(400).json(retornos.retornos(false,'Listar usuario',{erro:"Desculpe, mas nao foi possivel listar o usuario desejado!"}))
        } 
    }
    async inserirUsuario(req:Request,res:Response){
        try{
            if(req.is('json')){
                if(req.body.senha){
                    if(cpf.isValid(req.body.cpf)){
                        const usuario = await database.Usuario.create({nome: req.body.nome, cpf: req.body.cpf})
                        const senhaCripto = await senhaHash.adicionaSenha(req)
                        await database.Login.create({usuarioId: usuario.id, senha: senhaCripto})
                        logger.log('info',`Requisicao POST /usuarios. Criar usuario: id:${usuario.id}`)
                        logger.log('info',`Requisicao POST /login. Criar usuario: id:${usuario.id}`)
                        return res.status(201).json(retornos.retornos(true,'Usuario e login criado',{"Login":usuario.cpf}))
                    }else{
                        logger.error(`ERRO - Requisicao POST /usuarios. Erro: CPF inválido`,'error')
                        throw new Error("Desculpe, mas nao foi possivel inserir um novo usuario!")
                    }
                }else{
                    if(cpf.isValid(req.body.cpf)){
                        const usuario = await database.Usuario.create(req.body)
                        logger.log('info',`Requisicao POST /usuarios. Criar usuario: id:${usuario.id}`)
                        return res.status(201).json(retornos.retornos(true,'Usuario criado',{id:usuario.id, nome:usuario.nome, cpf:usuario.cpf}))
                    }
                    else{
                        logger.error(`ERRO - Requisicao POST /usuarios. Erro: CPF inválido`,'error')
                        throw new Error("Desculpe, mas nao foi possivel inserir um novo usuario!")
                    }
                }
            }else{
                logger.error(`ERRO - Requisicao POST /usuarios. Erro: Dados inconsistentes`,'error')
                throw new Error ("Desculpe, mas nao foi possivel inserir um novo usuario!")
            } 
        }catch(error: any){
            logger.error(`ERRO - Requisicao POST /usuarios. Erro:${error.message}`,'error')
            return res.status(400).json(retornos.retornos(false,'Inserir usuarios',{erro:"Desculpe, mas nao foi possivel inserir um novo usuario!"}))
        }
    }
    async atualizarUsuario(req:Request,res:Response){
        try{
            if(req.is('json')){
                const usuario = await database.Usuario.findByPk(req.params.id)
                const usuarioAntigo = usuario
                    
                if(req.body.cpf == null || req.body.cpf == undefined){
                    await usuario.update(req.body)
                    logger.log('info',`Requisicao PUT /usuarios/${req.params.id} ATUALIZOU:${usuarioAntigo} PARA:${usuario}  FROM: id:${req.headers.userId} nome:${req.headers.userNome}`)
                    res.status(200).json(retornos.retornos(true,'Atualizar usuario',{id:usuario.id, nome:usuario.nome, cpf:usuario.cpf}))
                }else{
                    if(cpf.isValid(req.body.cpf)){
                        await usuario.update(req.body)
                        logger.log('info',`Requisicao PUT /usuarios/${req.params.id} ATUALIZOU:${usuarioAntigo} PARA:${usuario}  FROM: id:${req.headers.userId} nome:${req.headers.userNome}`)
                        res.status(200).json(retornos.retornos(true,'Atualizar usuario',{id:usuario.id, nome:usuario.nome, cpf:usuario.cpf}))
                    }else{
                        logger.error(`ERRO - Requisicao PUT /usuarios/${req.params.id}  FROM: id:${req.headers.userId} nome:${req.headers.userNome}. Erro: CPF inválido`,'error')
                        throw new Error("Desculpe, mas nao foi possivel atualizar o usuario desejado!")
                    }
                }
            }else{
                logger.error(`ERRO - Requisicao PUT /usuarios/${req.params.id}  FROM: id:${req.headers.userId} nome:${req.headers.userNome}. Erro: Dados inconsistentes`,'error')
                throw new Error("Desculpe, mas nao foi possivel atualizar o usuario desejado!")
            }
        }catch(error: any){
            logger.error(`ERRO - Requisicao PUT /usuarios/${req.params.id}  FROM: id:${req.headers.userId} nome:${req.headers.userNome}. Erro: ${error.message}`,'error')
            return res.status(400).json(retornos.retornos(false,'Atualizar usuarios',{erro:"Desculpe, mas nao foi possivel atualizar o usuario desejado!"}))
        }
    }
    async deletarUsuario(req:Request,res:Response){
        try{
            const usuario = await database.Usuario.findByPk(req.params.id)
            await usuario.destroy()
            logger.log('info',`Requisicao DELETE /usuarios/${req.params.id}  FROM: id:${req.headers.userId} nome:${req.headers.userNome}`)
            return res.status(200).json(retornos.retornos(true,'Deletar usuarios',usuario.nome))
        }catch(error: any){
            logger.error(`ERRO - Requisicao DELETE /usuarios/${req.params.id}  FROM: id:${req.headers.userId} nome:${req.headers.userNome}. Erro: ${error.message}`,'error')
            return res.status(400).json(retornos.retornos(false,'Deletar usuarios',{erro:"Desculpe, mas nao foi possivel deletar o usuario desejado!"}))
        }
    }
}
export default new UsuarioController()


