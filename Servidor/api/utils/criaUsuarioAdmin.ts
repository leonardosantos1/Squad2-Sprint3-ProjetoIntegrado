require('dotenv').config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
  })

import request from 'supertest'
import app from '../app'
import database from '../models'

async function usuarioLoginAdmin(){
   var usuario = await database.Usuario.findOne({where:{nome:"admin"}})

   if(usuario == null || usuario == undefined){
       usuario = await database.Usuario.create({nome:'admin',cpf:process.env.USER_ADMIN_CPF})
      
       await request(app)
       .post('/login/')
       .send({usuarioId:usuario.id, senha:'123'})
    
       await request(app)
       .post('/login/admin')
       .send({usuarioId:usuario.id, senha:'123'})
   }
    const login = await database.Login.findOne({where:{usuarioId:usuario.id}})  
    const responseToken = await request (app)
    .post('/login/entrar')
    .send({id:login.id,senha:'123'})    
    const token = responseToken.get('Authorization')

    return token;
}

 export default usuarioLoginAdmin