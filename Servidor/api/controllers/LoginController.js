const database =  require('../models')
const senhaHash = require('../estrategiaLogin/senhaHashController')
const jwt = require('jsonwebtoken')

module.exports = {
    async listar(req,res){
        try{
            const login = await database.Login.findAll()
            return res.status(200).json(trataLogins(login))
        }catch(error){
            return res.status(400).json({erro:"Desculpa, mas nao foi possivel listar os usuarios!"})
        }
    },
    login(req,res){
        const token = criaTokenJWT(req.body)
        res.set('Authorization', token)
        res.status(204).send();
    },
    async criarLogin(req,res){
        try{
            if(req.is('json')){
                req.body.senha = await senhaHash.adiconaSenha(req)
                const login = await database.Login.create(req.body)
                return res.status(201).json({id:login.id, senha:login.senha}) 
            }else{
                throw new Error("Desculpe, mas nao foi possivel criar um novo usuario!")
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
                res.status(200).json({usuario_id:login.usuario_id, senha:login.senha})
            }else{
                return res.status(400).json({erro:"Desculpe, mas nao foi possivel atualizar!"})
            }
        }catch(error){
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel atualizar o login!"})
        }
    },
}

function criaTokenJWT(login){
    const payload = {
        id: login.id
    }
    const token = jwt.sign(payload, process.env.CHAVE_JWT)
    return token;
}

function trataLogins(arr){
    let login = [];
    for(i = 0 ; i < arr.length ; i++){
        login.push({id:arr[i].id, senha:arr[i].senha})
    }
    return login
}
