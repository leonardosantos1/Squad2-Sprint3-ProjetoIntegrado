const database =  require('../models')
const senhaHash = require('../estrategiaLogin/senhaHashController')
const jwt = require('jsonwebtoken')
import {Request,Response} from 'express'

class LoginController{
    async listar(req:Request,res:Response){
        try{
            const login = await database.Login.findAll()
            return res.status(200).json(login)
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
                return res.status(201).json({"id":login.id, "senha":login.senha}) 
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
/*
function trataLogins(arr){
    let login = [];
    for(i = 0 ; i < arr.length ; i++){
        login.push({id:arr[i].id, senha:arr[i].senha})
    }
    return login
}*/
