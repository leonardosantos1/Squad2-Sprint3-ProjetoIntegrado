const database = require('../models')


module.exports= {

    async listarUsuarios(req,res){
        try{
            const usuarios = await database.Usuario.findAll()
            return res.status(200).json(usuariosNome(usuarios))
        }catch(error){
            return res.status(400).json({erro:error.message})
        }
    },
    async listarUsuario(req,res){
        try{
            const usuario = await database.Usuario.findByPk(req.params.id)
            return res.status(200).json(usuariosNome(usuarios))
        }catch(error){
            return res.status(400).json({erro:error.message})
        }
    },
    async inserirUsuario(req,res){
        try{
            if(req.is('json')){
                const usuario = await database.Usuario.create(req.body)
            return res.status(201).json({nome: usuario.nome, cpf: usuario.cpf})
            }else{
                throw new Error ("Desculpe, mas nao foi possivel inserir um novo usuario!")
            } 
        }catch(error){
            console.log(error.message)
            return res.status(400).json({erro:error.message})
        }
    },
    async atualizarUsuario(req,res){
        try{
            if(req.is('json')){
                const usuario = await database.Usuario.findByPk(req.params.id)
                await usuario.update(req.body)
                res.status(200).json({id: usuario.id, nome: usuario.nome, cpf: usuario.cpf})
            }else{
                throw new Error("Desculpe, mas nao foi possivel inserir um novo usuario!")
            }
        }catch(error){
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel atualizar um novo usuario!"})
        }

    },

    async deletarUsuario(req,res){
        try{
            const usuario = await database.Usuario.findByPk(req.params.id)
            await usuario.destroy(req.body)
            return res.status(200).send()
        }catch(error){
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel deletar um novo usuario!"})
        }

    }

}

function usuariosNome(arr){
    let usuario = [];
    for(i=0;i<arr.length;i++){
        usuario.push({nome: arr[i].nome, cpf: arr[i].cpf})
    }
    return usuario
}