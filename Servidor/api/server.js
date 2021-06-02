const express =  require('express')

const app  = express()

const rotaUsuario =  require('./routes/usuarioRota')
const rotaLogin =  require('./routes/loginRota')
const rotaTipo =  require('./routes/tipoRota')


app.use(express.json())

app.use('/usuario',rotaUsuario)
app.use('/login',rotaLogin)
app.use('/tipo',rotaTipo)


app.listen(3000)