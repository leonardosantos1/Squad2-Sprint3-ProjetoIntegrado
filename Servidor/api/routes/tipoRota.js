const router = require('express').Router()
const tipoController = require("../controllers/TipoController")
const passport = require('passport')

router.get("/listar",tipoController.listarTipos)
router.get("/buscar/:id",tipoController.listarTipo)
router.post('/inserir',passport.authenticate('bearer',{session:false}),tipoController.inserirTipo)
router.put('/atualizar/:id',passport.authenticate('bearer',{session:false}),tipoController.atualizarTipo)
router.delete("/deletar/:id",passport.authenticate('bearer',{session:false}),tipoController.deletarTipo)


module.exports = router