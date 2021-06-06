require('dotenv').config()
const middlewaresAutenticacao = require('./estrategiaLogin/middlewares-autenticacao')
const express =  require('express')
const app  = express()

const rotaUsuario =  require('./routes/usuarioRota')
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

app.listen(3000)