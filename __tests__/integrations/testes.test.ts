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
