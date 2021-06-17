const database = require('../models')
import {Request,Response} from 'express'


class UsuarioController{

    async listarUsuarios(req:Request,res:Response){
        try{
            const usuarios = await database.Usuario.findAll()
            return res.status(200).json(usuarios)
        }catch(error: any){
            console.log(error)
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel listar os usuarios!"})
        }
    }
    async listarUsuario(req:Request,res:Response){
        try{
            const usuario = await database.Usuario.findByPk(req.params.id)
            return res.status(200).json({id:usuario.id, nome:usuario.nome, cpf:usuario.cpf})
        }catch(error: any){
            console.log(error.message)
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel listar o usuario desejado!"})
        }
    }
    async inserirUsuario(req:Request,res:Response){
        try{
            if(req.is('json')){
                const usuario = await database.Usuario.create(req.body)
            return res.status(201).json({id:usuario.id, nome:usuario.nome, cpf:usuario.cpf})
            }else{
                throw new Error ("Desculpe, mas nao foi possivel inserir um novo usuario!")
            } 
        }catch(error: any){
            console.log(error.message)
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel inserir um novo usuario!"})
        }
    }
    async atualizarUsuario(req:Request,res:Response){
        try{
            if(req.is('json')){
                const usuario = await database.Usuario.findByPk(req.params.id)
                await usuario.update(req.body)
                res.status(200).json({id:usuario.id, nome:usuario.nome, cpf:usuario.cpf})
            }else{
                throw new Error("Desculpe, mas nao foi possivel atualizar o usuario desejado!")
            }
        }catch(error: any){
            console.log(error.message)
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel atualizar o usuario desejado!"})
        }

    }
    async deletarUsuario(req:Request,res:Response){
        try{
            const usuario = await database.Usuario.findByPk(req.params.id)
            await usuario.destroy()
            return res.status(200).json({msg:"Usuario deletado com sucesso!"})
        }catch(error: any){
            console.log(error.message)
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel deletar o usuario desejado!"})
        }
    }
}

export default new UsuarioController()



/*
function trataUsuarios(arr){
    let usuario = [];
    for(i = 0 ; i < arr.length ; i++){
        usuario.push({nome: arr[i].nome, cpf: arr[i].cpf})
    }
    return usuario
}*/