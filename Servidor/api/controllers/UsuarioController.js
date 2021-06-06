const database = require('../models')


module.exports= {

    async listarUsuarios(req,res){
        try{
            const usuarios = await database.Usuario.findAll()
            return res.status(200).json(trataUsuarios(usuarios))
        }catch(error){
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel listar os usuarios!"})
        }
    },
    async listarUsuario(req,res){
        try{
            const usuario = await database.Usuario.findByPk(req.params.id)
            return res.status(200).json(usuariosNome(usuario))
        }catch(error){
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel listar o usuario desejado!"})
        }
    },
    async inserirUsuario(req,res){
        try{
            if(req.is('json')){
                const usuario = await database.Usuario.create(req.body)
            return res.status(201).json({id:usuario.id, nome:usuario.nome, cpf:usuario.cpf})
            }else{
                throw new Error ("Desculpe, mas nao foi possivel inserir um novo usuario!")
            } 
        }catch(error){
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel inserir um novo usuario!"})
        }
    },
    async atualizarUsuario(req,res){
        try{
            if(req.is('json')){
                const usuario = await database.Usuario.findByPk(req.params.id)
                await usuario.update(req.body)
                res.status(200).json({id:usuario.id, nome:usuario.nome, cpf:usuario.cpf})
            }else{
                throw new Error("Desculpe, mas nao foi possivel atualizar o usuario desejado!")
            }
        }catch(error){
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel atualizar o usuario desejado!"})
        }

    },
    async deletarUsuario(req,res){
        try{
            const usuario = await database.Usuario.findByPk(req.params.id)
            await usuario.destroy(req.body)
            return res.status(200).json({msg:"Usuario deletado com sucesso!"})
        }catch(error){
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel deletar o usuario desejado!"})
        }

    }

}

function trataUsuarios(arr){
    let usuario = [];
    for(i = 0 ; i < arr.length ; i++){
        usuario.push({nome: arr[i].nome, cpf: arr[i].cpf})
    }
    return usuario
}