const express =  require('express')
const app  = express()
const rotaUsuario =  require('./routes/usuarioRota')

app.use(express.json())

app.use('/usuario',rotaUsuario)
app.listen(3000)