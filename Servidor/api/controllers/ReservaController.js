import database from '../models'

module.exports = {
    async listarReservas(req,res){
        try{
            const reservas = await database.Reserva.findAll()
            return res.status(200).json(trataReservas(reservas))
        }catch(error){
            console.log(error.message)
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel listar as reservas desejada!"})
        }
    },
    async listarReserva(req,res){
        try{
            const reserva = await database.Reserva.findByPk(req.params.id)
            return res.status(200).json({dataReserva:reserva.dataReserva, checkout:reserva.checkout, itemUsuarioId:reserva.itemIsuarioId})
        }catch(error){
            console.log(error.message)
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel listar a reserva desejada!"})
        }
    },
    async inserirReserva(req,res){
        try{
            if(req.is('json')){
                const reserva = await database.Reserva.create(req.body)
            return res.status(201).json({dataReserva:reserva.dataReserva, checkout:reserva.checkout, itemUsuarioId:reserva.itemIsuarioId})
            }else{
                throw new Error ("Desculpe, mas nao foi possivel inserir um novo usuario!")
            } 
        }catch(error){
            console.log(error.message)
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel inserir uma nova reserva!"})
        }
    },
    async atualizarReserva(req,res){
        try{
            if(req.is('json')){
                const reserva = await database.Reserva.findByPk(req.params.id)
                await reserva.update(req.body)
                res.status(200).json({dataReserva:reserva.dataReserva, checkout:reserva.checkout, itemUsuarioId:reserva.itemIsuarioId})
            }else{
                throw new Error("Desculpe, mas nao foi possivel inserir uma nova reserva!")
            }
        }catch(error){
            console.log(error.message)
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel inserir uma nova reserva!"})
        }
    },
    async deletarReserva(req,res){
        try{
            const reserva = await database.Reserva.findByPk(req.params.id)
            await reserva.destroy(req.body)
            return res.status(200).json({msg:"Reserva deletada com sucesso!"})
        }catch(error){
            console.log(error.message)
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel deletar a reserva desejada!"})
        }
    }
}

function trataReservas(arr){
    let reserva = [];
    for(let i = 0 ; i < arr.length ; i++){
        reserva.push({id:arr[i].id,dataReserva: arr[i].dataReserva, checkout: arr[i].checkout, itemUsuarioId: arr[i].itemIsuarioId})
    }
    return reserva
}
