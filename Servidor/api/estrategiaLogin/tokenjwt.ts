const jwt = require('jsonwebtoken')

export function criaTokenJWT(login:{id:number, senha:string, usuarioId:number}){
    const payload = {
        id: login.id
    }
    const token = jwt.sign(payload, process.env.CHAVE_JWT,{expiresIn: '20m'})
    return token;
}