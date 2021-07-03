const passport = require('passport')
const localStrategy = require('passport-local').Strategy
import db from '../models'
const bcrypt = require('bcrypt')
const BearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jsonwebtoken')

function verificaUsuario(usuario){
    if(!usuario){
        throw new InvalidArgumentError('Nao existe usuario com esse email!')
    }
}

async function verificaSenha(senha,senhaHash){
    const senhaInvalida = await bcrypt.compare(senha, senhaHash)
    if(!senhaInvalida){
        throw new Error("Usuario ou senha invalidos")
    }
}

passport.use(
    new localStrategy({
        usernameField: 'id',
        passwordField: 'senha',
        session: false
    },async (id , senha, done)=>{
        try {
            const login = await db.Login.findByPk(id)
            verificaUsuario(login)
            await verificaSenha(senha, login.senha)
            done(null, login)
        } catch (error) {
            done(error)
        }
    })
)

passport.use(
    new BearerStrategy(
        async (token,done)=>{
            try {
                const payload = jwt.verify(token, process.env.CHAVE_JWT)
                const login = await db.Login.findByPk(payload.id)
                done(null,login)
            } catch (error) {
                done(error)
            }
           
        }
    )
)