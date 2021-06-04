const router = require('express').Router()
const passport = require('passport')
const loginController = require('../controllers/LoginController')
const middlewaresAutenticacao = require('../estrategiaLogin/middlewares-autenticacao')


router.post('/',middlewaresAutenticacao.local,loginController.login )

router.get('/listar',loginController.listar)
router.post('/criar',loginController.criarLogin)
router.put('/atualizar/:id',passport.authenticate('bearer',{session:false}),loginController.atualizarLogin)//tratar senha

module.exports = router