const database =  require('../models')

module.exports = {
    async listarItens(req,res){
        try{
            const itens = await database.Item.findAll()
            return res.status(200).json(itemNome(itens))
        }catch(error){
            return res.status(400).json({erro:'Desculpe, mas não foi possivel listar'})
        }
    },
    async listarItem(req,res){
        try{
            const item = await database.Item.findByPk(req.params.id)
            return res.status(200).json(trataitem(item))
        }catch(error){
            return res.status(400).json({erro:'Desculpe, mas não foi possivel buscar o item'})
        }
    },
    async inserirItem(req,res){
        try{
            if(req.is('json')){
                const item = await database.Item.create(req.body)
                console.log(req.body)
            return res.status(201).json(trataitem(item))
            }else{
                throw new Error ("Desculpe, mas nao foi possivel inserir!")
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
                res.status(200).json(trataitem(item))
            }else{
                throw new Error("Desculpe, mas nao foi possivel inserir!")
            }
        }catch(error){
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel atualizar!"})
        }

    },

    async deletarItem(req,res){
        try{
            const item = await database.Item.findByPk(req.params.id)
            await item.destroy(req.body)
            return res.status(200).send("Item deletado")
        }catch(error){
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel deletar!"})
        }

    }
}
function itemNome(arr){
    let itemitem = [];
    for(i=0;i<arr.length;i++){
        itemitem.push({id: arr[i].id, numeracao: arr[i].numeracao, tipo_id: arr[i].tipo_id})
    }
    return itemitem
}
function trataitem(item){ return {id:item.id,numeracao:item.numeracao,tipo_id:item.tipo_id}}