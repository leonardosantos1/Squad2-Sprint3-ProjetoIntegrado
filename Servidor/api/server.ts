import app  from './app'
import db from './models'
const logger = require('./config/logger')

if(process.env.NODE_ENV == undefined){
    db.sequelize.sync().then(()=>{
     app.listen(3000,()=>{
         logger.log('info',`Servidor rodando na porta: 3000`)
        console.log("APP ESCUTANDO NA PORTA 3000")
        })
    })
}else{
    app.listen(3000,()=>{
        logger.log('info',`Servidor rodando na porta: 3000`)
       console.log("APP ESCUTANDO NA PORTA 3000")
       })
}