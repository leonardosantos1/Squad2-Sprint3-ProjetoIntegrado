
const database =  require('../models')

const senhaHash = require('../estrategiaLogin/senhaHashController')

const jwt = require('jsonwebtoken')


function criaTokenJWT(login){
    const payload = {
        id: login.id
    }
    const token = jwt.sign(payload, process.env.CHAVE_JWT)
    return token;
}

module.exports = {
    async listar(req,res){
        try{
            const login = await database.Login.findAll()
            return res.status(200).json(login)
        }catch(error){
            return res.status(400).json({erro:error.message})
        }
    },
    login: (req,res)=>{
        console.log(req.body)
        const token = criaTokenJWT(req.body)
        res.set('Authorization', token)
        res.status(204).send();
    },
    async criarLogin(req,res){
        try{
            if(req.is('json')){
                //console.log(req.body.senha)
                req.body.senha = await senhaHash.adiconaSenha(req)
                console.log(req.body)
                const login = await database.Login.create(req.body)
                return res.status(201).json(login)
            }else{
                throw new Error("Desculpe, mas nao foi possivel inserir um novo usuario!")
            }
        }catch(error){
            return res.status(400).json({erro:error.message})
        }
    },
    async atualizarLogin(req,res){
        try{
            if(req.is('json')){
                const login = await database.Login.findByPk(req.params.id)
                await login.update(req.body)
                res.status(200).json(login)
            }
        }catch(error){
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel atualizar um novo usuario!"})
        }
    },
}

