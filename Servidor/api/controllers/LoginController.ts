const database =  require('../models')
const senhaHash = require('../estrategiaLogin/senhaHashController')
const jwt = require('jsonwebtoken')
import {Request,Response} from 'express'

class LoginController{
    async listar(req:Request,res:Response){
        try{
            const login = await database.Login.findAll()
            return res.status(200).json(trataLogins(login))
        }catch(error: any){
            console.log(error.message)
            return res.status(400).json({erro:"Desculpa, mas nao foi possivel listar os usuarios!"})
        }
    }
    login(req:Request,res:Response){
        const token = criaTokenJWT(req.body)
        res.set('Authorization', token)
        res.status(204).send();
    }
    async criarLogin(req:Request,res:Response){
        try{
            if(req.is('json')){
                req.body.senha = await senhaHash.adiconaSenha(req)
                const login = await database.Login.create(req.body)
                return res.status(201).json({"Login":login.id}) 
            }else{
                throw new Error("Desculpe, mas nao foi possivel criar um novo usuario!")
            }
        }catch(error: any){
            console.log(error.message)
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel criar um novo usuario!"})
        }
    }
    async criarLoginadm(req:Request,res:Response){
        try{
            if(req.is('json')){
                if(req.body.cpf && req.body.senha){
                    const usurioadm = await database.Usuario.findOne({ where: { cpf: req.body.cpf } })
                    if(usurioadm){
                        req.body.senha = await senhaHash.adiconaSenhaadm(req)
                        await database.Login.update({ senha: req.body.senha }, {where: {usuario_id: usurioadm.id}});
                        return res.status(201).json({"Cargo_atribuido":"Administrador"})
                    } 
                }
                if(req.body.usuario_id && req.body.senha){
                    const usurioadm = await database.Usuario.findByPk(req.body.usuario_id)
                    if(usurioadm){
                        req.body.senha = await senhaHash.adiconaSenhaadm(req)
                        await database.Login.update({ senha: req.body.senha }, {where: {usuario_id: req.body.usuario_id}});
                        return res.status(201).json({"Cargo_atribuido":"Administrador"})
                    }   
            }else{
                        req.body.senha = await senhaHash.adiconaSenhaadm(req)
                        const login = await database.Login.create(req.body)
                        return res.status(201).json({"Login":login.id, "Cargo":"Administrador"})
                    } 
                
            }else{
                throw new Error("Desculpe, mas nao foi possivel criar um novo usuario!")
            }
        }catch(error: any){
            console.log(error.message)
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel criar um novo usuario!"})
        }
    }
    async atualizarLogin(req:Request,res:Response){
        try{
            if(req.is('json')){
                const login = await database.Login.findByPk(req.params.id)
                await login.update(req.body)
                res.status(200).json({"usuario_id":login.usuario_id, "senha":login.senha})
            }else{
                return res.status(400).json({erro:"Desculpe, mas nao foi possivel atualizar!"})
            }
        }catch(error: any){
            console.log(error.message)
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel atualizar o login!"})
        }
    }
}

function criaTokenJWT(login:{id:number, senha:string, usuario_id:number}){
    const payload = {
        id: login.id
    }
    const token = jwt.sign(payload, process.env.CHAVE_JWT)
    return token;
}
export default new LoginController()



function trataLogins(arr:any){
    let login = [];
    for(let i:any = 0 ; i < arr.length ; i++){
        login.push({id:arr[i].id})
    }
    return login
}
