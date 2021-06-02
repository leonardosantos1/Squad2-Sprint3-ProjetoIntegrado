const database =  require('../models')

module.exports = {
    async listarTipos(req,res){
        try{
            const tipos = await database.Tipo.findAll()
            return res.status(200).json(tipos)
        }catch(error){
            return res.status(400).json({erro:error.message})
        }
    },
    async listarTipo(req,res){
        try{
            const tipo = await database.Tipo.findByPk(req.params.id)
            return res.status(200).json(tipo)
        }catch(error){
            return res.status(400).json({erro:error.message})
        }
    },
    async inserirTipo(req,res){
        try{
            if(req.is('json')){
                const tipo = await database.Tipo.create(req.body)
                console.log(req.body)
            return res.status(201).json(tipo)
            }else{
                throw new Error ("Desculpe, mas nao foi possivel inserir um novo usuario!")
            } 
        }catch(error){
            return res.status(400).json({erro:error.message})
        }
    },
    async atualizarTipo(req,res){
        try{
            if(req.is('json')){
                const tipo = await database.Tipo.findByPk(req.params.id)
                await tipo.update(req.body)
                res.status(200).json(tipo)
            }else{
                throw new Error("Desculpe, mas nao foi possivel inserir um novo usuario!")
            }
        }catch(error){
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel atualizar um novo usuario!"})
        }

    },

    async deletarTipo(req,res){
        try{
            const tipo = await database.Tipo.findByPk(req.params.id)
            await tipo.destroy(req.body)
            return res.status(200).send()
        }catch(error){
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel deletar um novo usuario!"})
        }

    }
}