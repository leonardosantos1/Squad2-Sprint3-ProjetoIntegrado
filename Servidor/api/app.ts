require('dotenv').config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
  })

const middlewaresAutenticacao = require('./estrategiaLogin/middlewares-autenticacao')
const {camelCase} = require('./utils/camelCase')

import express from 'express'
const app  = express()
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

export default app