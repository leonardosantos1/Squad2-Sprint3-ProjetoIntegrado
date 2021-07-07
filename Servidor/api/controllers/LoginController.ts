import database from '../models'
const senhaHash = require('../estrategiaLogin/senhaHashController')
const jwt = require('../estrategiaLogin/tokenjwt')
import {Request,Response} from 'express'
const logger = require('../config/logger')
import retornos = require('./retornosController')

class LoginController{
    async listar(req:Request,res:Response){
        try{
            const login = await database.Login.findAll({attributes:["id"]})
            logger.log('info',`Requisicao GET /login`)
            return res.status(200).json(retornos.retornos(true,'Listar logins',login))
        }catch(error: any){
            logger.error(`ERRO - Requisicao GET /usuarios. Erro:${error.message}`,'error')
            return res.status(400).json(retornos.retornos(false,'Listar logins',{erro:"Desculpa, mas nao foi possivel listar os logins!"}))
        }
    }
    login(req:Request,res:Response){
        const token = jwt.criaTokenJWT(req.body)
        res.set('Authorization', token)
        logger.log('info',`Requisicao POST /login FROM: id:${req.headers.userId} nome:${req.headers.userNome}`)
        res.status(204).send();
    }
    async criarLogin(req:Request,res:Response){
        try{
            if(req.is('json')){
                req.body.senha = await senhaHash.adicionaSenha(req)
                const login = await database.Login.create(req.body)
                logger.log('info',`Requisicao POST /login`)
                return res.status(201).json(retornos.retornos(true,'Listar login',{"Login":login.id}))
            }else{
                logger.error(`ERRO - Requisicao POST /login . Erro: formato da requisicao incompativel`,'error')
                throw new Error("Desculpe, mas nao foi possivel criar um novo login!")
            }
        }catch(error: any){
            logger.error(`ERRO - Requisicao POST /login . Erro:${error.message}`,'error')
            return res.status(400).json(retornos.retornos(false,'Listar login',{erro:"Desculpe, mas nao foi possivel criar um novo login!"}))
        }
    }
    async criarLoginAdm(req:Request,res:Response){
        try{
            if(req.is('json')){
                if(req.body.cpf && req.body.senha){
                    const usurioaAdm = await database.Usuario.findOne({ where: { cpf: req.body.cpf } })
                    if(usurioaAdm){
                        req.body.senha = await senhaHash.adicionaSenhaAdm(req)
                        await database.Login.update({ senha: req.body.senha }, {where: {usuarioId: usurioaAdm.id}});
                        logger.log('info',`Requisicao POST /login/admin/ CPF:${req.body.cpf}  FROM: id:${req.headers.userId} nome:${req.headers.userNome}`)
                        return res.status(201).json(retornos.retornos(true,'Criar login',{"CargoAtribuido":"Administrador"}))
                    } 
                }
                if(req.body.usuarioId && req.body.senha){   
                    const usurioaAdm = await database.Usuario.findByPk(req.body.usuarioId)
                    if(usurioaAdm){
                        req.body.senha = await senhaHash.adicionaSenhaAdm(req)
                        await database.Login.update({ senha: req.body.senha }, {where: {usuarioId: req.body.usuarioId}});
                        logger.log('info',`Requisicao POST /login/admin/ ID:${req.body.usuarioId}  FROM: id:${req.headers.userId} nome:${req.headers.userNome}`)
                        return res.status(201).json(retornos.retornos(true,'Criar login',{"CargoAtribuido":"Administrador"}))
                    }   
                }else{
                    req.body.senha = await senhaHash.adicionaSenhaAdm(req)
                    const login = await database.Login.create(req.body)
                    logger.log('info',`Requisicao POST /login/admin/ ID:${req.body.usuarioId}  FROM: id:${req.headers.userId} nome:${req.headers.userNome}`)
                    return res.status(201).json(retornos.retornos(true,'Criar login',{"Login":login.id, "Cargo":"Administrador"}))
                    } 
            }else{
                logger.error(`ERRO - Requisicao POST /login/admin . Erro:Dados inconsistentes  FROM: id:${req.headers.userId} nome:${req.headers.userNome}`,'error')
                throw new Error("Desculpe, mas nao foi possivel criar um novo login!")
            }
        }catch(error: any){
            logger.error(`ERRO - Requisicao POST /login/admin . Erro:${error.message}  FROM: id:${req.headers.userId} nome:${req.headers.userNome}`,'error')
            return res.status(400).json(retornos.retornos(false,'Criar login',{erro:"Desculpe, mas nao foi possivel criar um novo login!"}))
        }
    }
    async atualizarLogin(req:Request,res:Response){
        try{
            if(req.is('json')){
                let identificador = req.params.id;
                if(identificador.length<=10){
                    identificador = req.params.id
                }else{
                    const usuario = await database.Usuario.findOne({ where: { cpf: req.params.id } })
                    const login = await database.Login.findOne({ where: { usuarioId: usuario.id } })
                    identificador = login.id     
                }
                const login = await database.Login.findByPk(identificador)
                if(login.senha.indexOf("$14") === 3){
                    req.body.senha = await senhaHash.adicionaSenhaAdm(req)
                }else{
                    req.body.senha = await senhaHash.adicionaSenha(req)
                } 
                await login.update(req.body)
                logger.log('info',`Requisicao PUT /login/admin/${req.params.id} ATUALIZOU:SENHA FROM: id:${req.headers.userId} nome:${req.headers.userNome}`)
                res.status(200).json(retornos.retornos(true,'Atualiza login',{"usuarioId":login.usuarioId}))
            }else{
                logger.error(`ERRO - Requisicao PUT /login/admin${req.params.id} . Erro:Formato incompativel  FROM: id:${req.headers.userId} nome:${req.headers.userNome}`,'error')
                throw new Error("Desculpe, mas nao foi possivel atualizar o login!")
            }
        }catch(error: any){
            console.log(error.message)
            logger.error(`ERRO - Requisicao PUT /login/admin${req.params.id} . Erro:${error.message} FROM: id:${req.headers.userId} nome:${req.headers.userNome}`,'error')
            return res.status(400).json(retornos.retornos(false,'Atualiza login',{erro:"Desculpe, mas nao foi possivel atualizar o login!"}))
        }
    }
}

export default new LoginController()


