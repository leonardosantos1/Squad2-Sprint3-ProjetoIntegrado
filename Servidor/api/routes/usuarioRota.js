const router = require('express').Router()

router.get('/listar',(req,res)=>{
    res.json({mensagem:"teste mensagem"})
})

module.exports = router