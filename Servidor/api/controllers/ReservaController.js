const database =  require('../models')

module.exports = {
    async listarReservas(req,res){
        try{
            const reservas = await database.Reserva.findAll()
            return res.status(200).json(reservas)
        }catch(error){
            return res.status(400).json({erro:error.message})
        }
    },
    async listarReserva(req,res){
        try{
            const reserva = await database.Reserva.findByPk(req.params.id)
            return res.status(200).json(reserva)
        }catch(error){
            return res.status(400).json({erro:error.message})
        }
    },
    async inserirReserva(req,res){
        try{
            if(req.is('json')){
                const reserva = await database.Reserva.create(req.body)
                console.log(req.body)
            return res.status(201).json(reserva)
            }else{
                throw new Error ("Desculpe, mas nao foi possivel inserir um novo usuario!")
            } 
        }catch(error){
            return res.status(400).json({erro:error.message})
        }
    },
    async atualizarReserva(req,res){
        try{
            if(req.is('json')){
                const reserva = await database.Reserva.findByPk(req.params.id)
                await reserva.update(req.body)
                res.status(200).json(reserva)
            }else{
                throw new Error("Desculpe, mas nao foi possivel inserir um novo usuario!")
            }
        }catch(error){
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel atualizar um novo usuario!"})
        }

    },

    async deletarReserva(req,res){
        try{
            const reserva = await database.Reserva.findByPk(req.params.id)
            await reserva.destroy(req.body)
            return res.status(200).send()
        }catch(error){
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel deletar um novo usuario!"})
        }

    }
}