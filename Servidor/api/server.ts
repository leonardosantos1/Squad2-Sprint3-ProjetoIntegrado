require('dotenv').config()
const middlewaresAutenticacao = require('./estrategiaLogin/middlewares-autenticacao')
import express from 'express'
const db = require('./models')
const app  = express()

import rotaUsuario from './routes/usuarioRota'
const rotaLogin =  require('./routes/loginRota')
const rotaTipo =  require('./routes/tipoRota')
const rotaItem =  require('./routes/itemRota')
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
    app.listen(3000,()=>console.log("funfou!!"))
})