const database =  require('../models')


module.exports = {


    async listar(req,res){
        try{
            const login = await database.Login.findAll()
            return res.status(200).json(login)
        }catch(error){
            return res.status(400).json({erro:error.message})
        }
    },

    async criarLogin(req,res){
        try{
            if(req.is('json')){

                const login = await database.Login.create(req.body)
                return res.status(201).json(login)
            }else{
                throw new Error("Desculpe, mas nao foi possivel inserir um novo usuario!")
            }
        }catch(error){

            return res.status(400).json({erro:error.message})
        }
    },
    async atualizarLogin(req,res){
        try{
            if(req.is('json')){
                const login = await database.Login.findByPk(req.params.id)
                await login.update(req.body)
                res.status(200).json(login)
            }
        }catch(error){
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel atualizar um novo usuario!"})
        }

    }
}