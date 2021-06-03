const database =  require('../models')

module.exports = {
    async listarItens(req,res){
        try{
            const itens = await database.Item.findAll()
            return res.status(200).json(itens)
        }catch(error){
            return res.status(400).json({erro:'Desculpe, mas não foi possivel listar os itens'})
        }
    },
    async listarItem(req,res){
        try{
            const item = await database.Item.findByPk(req.params.id)
            return res.status(200).json(item)
        }catch(error){
            return res.status(400).json({erro:'Desculpe, mas não foi possivel buscar o item desejado'})
        }
    },
    async inserirItem(req,res){
        try{
            if(req.is('json')){
                const item = await database.Item.create(req.body)
                console.log(req.body)
            return res.status(201).json(item)
            }else{
                throw new Error ("Desculpe, mas nao foi possivel inserir um novo usuario!")
            } 
        }catch(error){
            return res.status(400).json({erro:error.message})
        }
    },
    async atualizarItem(req,res){
        try{
            if(req.is('json')){
                const item = await database.Item.findByPk(req.params.id)
                await item.update(req.body)
                res.status(200).json(item)
            }else{
                throw new Error("Desculpe, mas nao foi possivel inserir um novo usuario!")
            }
        }catch(error){
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel atualizar um novo usuario!"})
        }

    },

    async deletarItem(req,res){
        try{
            const item = await database.Item.findByPk(req.params.id)
            await item.destroy(req.body)
            return res.status(200).send()
        }catch(error){
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel deletar um novo usuario!"})
        }

    }
}