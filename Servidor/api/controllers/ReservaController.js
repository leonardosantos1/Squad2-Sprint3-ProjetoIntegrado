const database =  require('../models')

module.exports = {
    async listarReservas(req,res){
        try{
            const reservas = await database.Reserva.findAll()
            return res.status(200).json(reservas)
        }catch(error){
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel listar as reservas desejada!"})
        }
    },
    async listarReserva(req,res){
        try{
            const reserva = await database.Reserva.findByPk(req.params.id)
            return res.status(200).json(trataReserva(reserva))
        }catch(error){
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel listar a reserva desejada!"})
        }
    },
    async inserirReserva(req,res){
        try{
            if(req.is('json')){
                const reserva = await database.Reserva.create(req.body)
            return res.status(201).json(trataReserva(reserva))
            }else{
                throw new Error ("Desculpe, mas nao foi possivel inserir um novo usuario!")
            } 
        }catch(error){
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel inserir um novo usuario!"})
        }
    },
    async atualizarReserva(req,res){
        try{
            if(req.is('json')){
                const reserva = await database.Reserva.findByPk(req.params.id)
                await reserva.update(req.body)
                res.status(200).json(trataReserva(reserva))
            }else{
                throw new Error("Desculpe, mas nao foi possivel atualizar um novo usuario!")
            }
        }catch(error){
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel atualizar um novo usuario!"})
        }

    },
    async deletarReserva(req,res){
        try{
            const reserva = await database.Reserva.findByPk(req.params.id)
            await reserva.destroy(req.body)
            return res.status(200).json({msg:"Reserva deletada com sucesso!"})
        }catch(error){
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel deletar o usuario desejado!"})
        }

    }
}

function trataReservas(arr){
    let reserva = [];
    for(i = 0 ; i < arr.length ; i++){
        reserva.push({id:arr[i].id,data_reserva: arr[i].data_reserva, checkout: arr[i].checkout, item_usuario_id: arr[i].item_usuario_id})
    }
    return reserva
}

function trataReserva(reserva){ 
    return {data_reserva:reserva.data_reserva, checkout:reserva.checkout, item_usuario_id:reserva.item_usuario_id}
}