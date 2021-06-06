const database =  require('../models')

module.exports = {
    async listarItens(req,res){
        try{
            const itens = await database.Item.findAll()
            return res.status(200).json(trataItens(itens))
        }catch(error){
            return res.status(400).json({erro:'Desculpe, mas não foi possivel listar os itens!'})
        }
    },
    async listarItem(req,res){
        try{
            const item = await database.Item.findByPk(req.params.id)
            return res.status(200).json(trataItem(item))
        }catch(error){
            return res.status(400).json({erro:'Desculpe, mas não foi possivel buscar o item!'})
        }
    },
    async inserirItem(req,res){
        try{
            if(req.is('json')){
                const item = await database.Item.create(req.body)
            return res.status(201).json(trataItem(item))
            }else{
                throw new Error ("Desculpe, mas nao foi possivel inserir um novo item!")
            } 
        }catch(error){
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel inserir um novo item!"})
        }
    },
    async atualizarItem(req,res){
        try{
            if(req.is('json')){
                const item = await database.Item.findByPk(req.params.id)
                await item.update(req.body)
                res.status(200).json(trataItem(item))
            }else{
                throw new Error("Desculpe, mas nao foi possivel atualizar o item desejado!")
            }
        }catch(error){
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel atualizar o item desejado!"})
        }

    },
    async deletarItem(req,res){
        try{
            const item = await database.Item.findByPk(req.params.id)
            await item.destroy(req.body)
            return res.status(200).json({msg:"Item deletado com sucesso!"})
        }catch(error){
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel deletar o item desejado!"})
        }

    }
}

function trataItens(arr){
    let item = [];
    for(i = 0 ; i < arr.length ; i++){
        item.push({id: arr[i].id, numeracao: arr[i].numeracao, tipo_id: arr[i].tipo_id})
    }
    return item
}

function trataItem(item){ 
    return {id:item.id, numeracao:item.numeracao, tipo_id:item.tipo_id}
}