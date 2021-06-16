require('dotenv').config()
const middlewaresAutenticacao = require('./estrategiaLogin/middlewares-autenticacao')

import express from 'express'
const app  = express()

const db = require('./models')

import rotaUsuario from './routes/usuarioRota'
import rotaLogin from './routes/loginRota'
import rotaTipo from './routes/tipoRota'
import rotaItem from './routes/itemRota'

const rotaItemUsuario =  require('./routes/itemUsuarioRota')
const rotaReserva =  require('./routes/reservaRota')

const {estrategiaAutenticacao} = require('./estrategiaLogin')

app.use(express.json())

app.use('/usuario',rotaUsuario)
app.use('/login',rotaLogin)
app.use('/tipo',rotaTipo)
app.use('/item',rotaItem)
app.use('/itemUsuario',rotaItemUsuario)
app.use('/reserva',rotaReserva)

db.sequelize.sync().then(()=>{
    app.listen(3000,()=>console.log("APP ESCUTANDO NA PORTA 3000"))
})