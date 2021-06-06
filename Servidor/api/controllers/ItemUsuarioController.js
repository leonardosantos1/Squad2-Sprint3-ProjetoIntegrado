const database = require('../models')

module.exports = {
    async listarItensUsuario(req,res){
        try{
            const itensUsu = await database.item_usuario.findAll()
            //console.log()
            return res.status(200).json(itemUsuarioNome(itensUsu))
        }catch(error){
            return res.status(400).json({erro:error.message})
        }
    },
    async listarItemUsuario(req,res){
        try{
            const itemUsu = await database.item_usuario.findByPk(req.params.id)
            return res.status(200).json(trataItemUsuario(itemUsu))
        }catch(error){
            return res.status(400).json({erro:error.message})
        }
    },
    async inserirItemUsuario(req,res){
        try{
            if(req.is('json')){
                const itemUsu = await database.item_usuario.create(req.body)
            return res.status(201).json(trataItemUsuario(itemUsu))
            }else{
                throw new Error ("Desculpe, mas nao foi possivel inserir!")
            } 
        }catch(error){
            return res.status(400).json({erro:error.message})
        }
    },
    async atualizarItemUsuario(req,res){
        try{
            if(req.is('json')){
                const itemUsu = await database.item_usuario.findByPk(req.params.id)
                await itemUsu.update(req.body)
                res.status(200).json(trataItemUsuario(itemUsu))
            }else{
                throw new Error("Desculpe, mas nao foi possivel inserir!")
            }
        }catch(error){
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel atualizar!"})
        }

    },

    async deletarItemUsuario(req,res){
        try{
            const itemUsu = await database.item_usuario.findByPk(req.params.id)
            await itemUsu.destroy(req.body)
            return res.status(200).send("Item Usuario Deletado")
        }catch(error){
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel deletar!"})
        }

    }
}

function itemUsuarioNome(arr){
    let usuario = [];
    for(i=0;i<arr.length;i++){
        usuario.push({item_id: arr[i].item_id, usuario_id: arr[i].usuario_id})
    }
    return usuario
}

function trataItemUsuario(itemUsu){ return {item_id:itemUsu.item_id,usuario_id:itemUsu.usuario_id}}