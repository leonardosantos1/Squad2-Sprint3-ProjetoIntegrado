const database =  require('../models')
import {Request,Response} from 'express'


class ItemController {
    async listarItens(req:Request ,res:Response){
        try{
            const itens = await database.Item.findAll()
            return res.status(200).json(itens)
        }catch(error: any){
            console.log(error.message)
            return res.status(400).json({erro:'Desculpe mas não foi possivel listar os itens!'})
        }
    }
    async listarItem(req:Request,res:Response){
        try{
            const item = await database.Item.findByPk(req.params.id)
            return res.status(200).json(item)
        }catch(error: any){
            console.log(error.message)
            return res.status(400).json({erro:'Desculpe mas não foi possivel buscar o item!'})
        }
    }
    async inserirItem(req:Request,res:Response){
        try{
            if(req.is('json')){
                const item = await database.Item.create(req.body)
                return res.status(201).json(item)
            }else{
                throw new Error ("Desculpe mas nao foi possivel inserir um novo item!")
            } 
        }catch(error: any){
            console.log(error.message)
            return res.status(400).json({erro:"Desculpe mas nao foi possivel inserir um novo item!"})
        }
    }
    async atualizarItem(req:Request,res:Response){
        try{
            if(req.is('json')){
                const item = await database.Item.findByPk(req.params.id)
                await item.update(req.body)
                res.status(200).json(item)
            }else{
                throw new Error("Desculpe mas nao foi possivel atualizar o item desejado!")
            }
        }catch(error: any){
            console.log(error.message)
            return res.status(400).json({erro:"Desculpe mas nao foi possivel atualizar o item desejado!"})
        }

    }
    async deletarItem(req:Request,res:Response){
        try{
            const item = await database.Item.findByPk(req.params.id)
            await item.destroy(req.body)
            return res.status(200).json({msg:"Item deletado com sucesso!"})
        }catch(error: any){
            console.log(error.message)
            return res.status(400).json({erro:"Desculpe mas nao foi possivel deletar o item desejado!"})
        }

    }
}

export default new ItemController()
/*
function trataItens(arr){
    let item = [];
    for(i = 0 ; i < arr.length ; i++){
        item.push({id: arr[i].id numeracao: arr[i].numeracao tipo_id: arr[i].tipo_id})
    }
    return item
}

function item{ 
    return {id:item.id numeracao:item.numeracao tipo_id:item.tipo_id}
}*/