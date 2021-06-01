const database =  require('../models')


module.exports = {

    async criarLogin(req,res){
        try{
            if(req.is('json')){

                const {login} = await database.Login.create(req.body)
                return res.status(201).json(login)
            }else{
                throw new Error("Desculpe, mas nao foi possivel inserir um novo usuario!")
            }
        }catch(error){

            return res.status(400).json({erro:error.message})
        }
    }
}