require('dotenv').config()
const middlewaresAutenticacao = require('./estrategiaLogin/middlewares-autenticacao')
const {camelCase} = require('./utils/camelCase')
const logger = require('./config/logger')

import express from 'express'
const app  = express()
import db from './models'
import rotaUsuario from './routes/usuarioRota'
import rotaLogin from './routes/loginRota'
import rotaTipo from './routes/tipoRota'
import rotaItem from './routes/itemRota'
import rotaItemUsuario from './routes/itemUsuarioRota'
import rotaReserva from './routes/reservaRota'
import resolveip from './routes/resolveip'

const {estrategiaAutenticacao} = require('./estrategiaLogin')

app.use(express.json())
app.use(camelCase())

app.use('/usuario',rotaUsuario)
app.use('/login',rotaLogin)
app.use('/tipo',rotaTipo)
app.use('/item',rotaItem)
app.use('/itemUsuario',rotaItemUsuario)
app.use('/reserva',rotaReserva)
app.use('/resolveip',resolveip)

db.sequelize.sync().then(()=>{
    app.listen(3000,()=>{
        logger.log('info',`Servidor rodando na porta: 3000`)
        console.log("APP ESCUTANDO NA PORTA 3000")
    })
})