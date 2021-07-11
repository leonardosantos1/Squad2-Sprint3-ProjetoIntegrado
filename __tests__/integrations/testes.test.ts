import request from 'supertest'
import database from '../../Servidor/api/models'
import app from '../../Servidor/api/app'
import criaUsuarioAdmin from '../../Servidor/api/utils/criaUsuarioAdmin'

describe('CRUD Entidade Usuario',()=>{
    beforeAll(async()=>{
       await database.sequelize.sync()

   })

   afterAll(async()=>{
      await database.sequelize.drop()
     })
  
   test('Deve conseguir realizar GET de Usuarios', async()=>{
      const response = await request(app)
      .get('/usuario/')
     
      expect(response.status).toBe(200)
   })

    test('Deve conseguir realizar POST de um Usuario',async()=>{
      const response = await request(app)
      .post('/usuario/')
      .send({nome:'Usuario Dois', cpf:'12345678987'})

      expect(response.status).toBe(201)
   })

   test('Deve conseguir realizar GET de Usuario especifico',async()=>{
      const token  =  await criaUsuarioAdmin()
      const usuario =  await database.Usuario.findOne({where:{nome:'Usuario Dois'}})

      const response = await request(app)
      .get(`/usuario/${usuario.id}`)
      .set('Authorization',`Bearer ${token}`)

      expect(response.status).toBe(200)
   })

   test('Deve conseguir realizar PUT de um Usuario',async()=>{
      const token  =  await criaUsuarioAdmin()
      const usuario =  await database.Usuario.findOne({where:{nome:'Usuario Dois'}})

      const response = await request(app)
      .put(`/usuario/${usuario.id}`)
      .set('Authorization',`Bearer ${token}`)
      .send({nome:'Usuario Tres'})

      expect(response.status).toBe(200)
   })

   test('Deve conseguir realizar DELETE de um Usuario',async()=>{
      const token  =  await criaUsuarioAdmin()
      const usuario =  await database.Usuario.findOne({where:{nome:'Usuario Tres'}})

      const response =  await request(app)
      .delete(`/usuario/${usuario.id}`)
      .set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(200)
   })
})

describe('CRUD Entidade Tipo',()=>{
    beforeAll(async()=>{
       await database.sequelize.sync()
 
   })
 
   afterAll(async()=>{
      await database.sequelize.drop()
     })
 
     test('Deve conseguir realizar GET de Tipos',async()=>{
       const response = await request(app)
       .get('/tipo/')
 
       expect(response.status).toBe(200)
     })
  
     test('Deve conseguir realizar POST de Tipo', async()=>{
       const token = await criaUsuarioAdmin()
 
       const response1 =  await request(app)
       .post('/tipo/')
       .set('Authorization', `Bearer ${token}`)
       .send({categoria:'sala'})
 
       const response2 =  await request(app)
       .post('/tipo/')
       .set('Authorization', `Bearer ${token}`)
       .send({categoria:'projetor'})
 
       expect(response1.status).toBe(201)
       expect(response2.status).toBe(201)
     })
 
     test('Deve conseguir realizar GET de Tipo especifico',async()=>{
       const token = await criaUsuarioAdmin()
       const tipo = await database.Tipo.findOne({where:{categoria:'sala'}})
       
       const response = await request(app)
       .get(`/tipo/${tipo.id}`)
       .set('Authorization',`Bearer ${token}`)
 
       expect(response.status).toBe(200)
     })
 
     test('Deve conseguir realizar PUT de Tipo',async()=>{
       const token = await criaUsuarioAdmin()
       const tipo = await database.Tipo.findOne({where:{categoria:'sala'}})
 
       const response = await request(app)
       .put(`/tipo/${tipo.id}`)
       .set('Authorization',`Bearer ${token}`)
       .send({categoria:'mesa'})
 
       expect(response.status).toBe(200)
     })
 
     test('Deve conseguir realizar DELETE de Tipo',async()=>{
       const token = await criaUsuarioAdmin()
       const tipo = await database.Tipo.findOne({where:{categoria:'projetor'}})
 
       const response = await request(app)
       .delete(`/tipo/${tipo.id}`)
       .set('Authorization',`Bearer ${token}`)
 
       expect(response.status).toBe(200)
     })
 })   
 
