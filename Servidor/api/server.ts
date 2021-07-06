require('dotenv').config()
const middlewaresAutenticacao = require('./estrategiaLogin/middlewares-autenticacao')
import {Request, Response, NextFunction} from 'express'
import camelCaseKeys from 'camelcase-keys'
const logger = require('./config/logger')

const camelCase = ()=>{
    return function (req : Request, res : Response, next : NextFunction) {
        req.body = camelCaseKeys(req.body, { deep: true })
        req.params = camelCaseKeys(req.params)
        req.query = camelCaseKeys(req.query)
        next()
      }
}

import express from 'express'
const app  = express()
import db from './models'
import rotaUsuario from './routes/usuarioRota'
import rotaLogin from './routes/loginRota'
import rotaTipo from './routes/tipoRota'
import rotaItem from './routes/itemRota'
import rotaItemUsuario from './routes/itemUsuarioRota'
import rotaReserva from './routes/reservaRota'

const {estrategiaAutenticacao} = require('./estrategiaLogin')

app.use(express.json())
app.use(camelCase())

app.use('/usuario',rotaUsuario)
app.use('/login',rotaLogin)
app.use('/tipo',rotaTipo)
app.use('/item',rotaItem)
app.use('/itemUsuario',rotaItemUsuario)
app.use('/reserva',rotaReserva)

db.sequelize.sync().then(()=>{
    app.listen(3000,()=>{
        logger.log('info',`Servidor rodando na porta: 3000`)
        console.log("APP ESCUTANDO NA PORTA 3000")
    })
})