import {Request,Response} from 'express'
const logger = require('../config/logger')
import axios from "axios";



class resolveipController {
    listarItens(req:Request ,res:Response){
        axios
            .get('https://resolveip.herokuapp.com/')
            .then(response => {                    
                logger.log('info',`Requisicao GET /resolveip/ IP:${response.data.ip}`) 
                return res.status(200).json(response.data)
            })
            .catch(err => {
                logger.error(`ERRO - Requisicao GET /resolveip/. Erro:${err.message}`,'error')
                return res.status(400).json({erro:'Desculpe mas não foi possivel listar o IP!'})
            });
    }
}
export default new resolveipController()