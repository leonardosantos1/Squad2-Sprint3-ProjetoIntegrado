const passport = require('passport');
import database from '../models'
const logger = require('../config/logger')

module.exports = {
    local: async(req:any, res:any, next:any) => {
        try {
            if (!req.body.id && req.body.cpf) {
                const dadosUsuario = await database.Usuario.findOne({ where: { cpf: req.body.cpf } })
                const dadosLogin = await database.Login.findOne({ where: { usuarioId: dadosUsuario.id } })
                req.body.id = dadosLogin.id
                req.body.nome = dadosUsuario.nome
            } else {
                if (!req.body.id) {
                    return res.status(401).json({ erro: "Argumento inválido!" })
                }
            }
            passport.authenticate(
                'local', { session: false },
                (erro:any, usuario:any, info:any) => {
                    if (erro && erro.name === 'InvalidArgumentError') {
                        logger.error(`ERRO - Requisicao JWT local. Erro:InvalidArgumentError FROM: id:${req.body.id} CPF:${req.body.cpf}`, 'error')
                        return res.status(401).json({ erro: "Argumento inválido!" })
                    }
                    if (erro) {
                        logger.error(`ERRO - Requisicao JWT local. Erro:${erro} FROM: id:${req.body.id} CPF:${req.body.cpf}`, 'error')
                        return res.status(500).json({ erro: "Argumento inválido!" })
                    }
                    if (!usuario) {
                        logger.error(`ERRO - Requisicao JWT local. Erro:Usuario null FROM: id:${req.body.id} CPF:${req.body.cpf}`, 'error')
                        return res.status(401).json()
                    }
                    req.user = usuario
                    req.headers.userId = req.body.id
                    req.headers.userNome = req.body.nome
                    return next()
                }
            )(req, res, next);
        } catch (error) {
            logger.error(`ERRO - Requisicao JWT local. Erro:Dados para login errados  FROM: id:${req.body.id} CPF:${req.body.cpf}`, 'error')
            return res.status(500).json({ erro: "Argumento inválido!" })
        }

    },
    bearer: (req:any, res:any, next:any) => {
        passport.authenticate(
            'bearer', { session: false },
            async(erro:any, usuario:any, info:any) => {
                if (erro && erro.name === 'JsonWebTokenError') {
                    logger.error(`ERRO - Requisicao JWT local. Erro:JsonWebTokenError`, 'error')
                    return res.status(401).json()
                }
                if(erro && erro.name ==="TokenExpiredError"){//aqui
                    logger.error(`ERRO - Requisicao JWT local. Erro:${erro} expirado: ${erro.expiredAt}`, 'error')
                    return res.status(401).json({erro:"Entre novamente!"})
                }
                if (erro) {
                    logger.error(`ERRO - Requisicao JWT local. Erro:${erro} `, 'error')
                    return res.status(500).json({ erro: "Desculpe, mas ocorreu um erro com o seu token!" })
                }
                if (!usuario) {
                    logger.error(`ERRO - Requisicao JWT local. Erro:${erro} FROM: id:Usuario null `, 'error')
                    return res.status(401).json()
                }
                req.user = usuario;
                const dadosUsuario = await database.Usuario.findByPk(usuario.usuarioId)
                req.user.nome = dadosUsuario.nome
                req.headers.userId = dadosUsuario.id
                req.headers.userNome = dadosUsuario.nome
                if (usuario.senha.indexOf("$14") === 3) {
                    req.user.Admin = true
                    console.log("ADMIN" + " Nome: " + dadosUsuario.nome)
                } else {
                    req.user.Admin = false
                }
                return next();
            }
        )(req, res, next);
    },
    bearerAdm: (req:any, res:any, next:any) => {
        passport.authenticate(
            'bearer', { session: false },
            async(erro:any, usuario:any, info:any) => {
                if (erro && erro.name === 'JsonWebTokenError') {
                    logger.error(`ERRO - Requisicao JWT local. Erro:JsonWebTokenError  `, 'error')
                    return res.status(401).json()
                }
                if(erro && erro.name ==="TokenExpiredError"){//aqui
                    logger.error(`ERRO - Requisicao JWT local. Erro:${erro} expirado: ${erro.expiredAt}`, 'error')
                    return res.status(401).json({erro:"Entre novamente!"})
                }
                if (erro) {
                    logger.error(`ERRO - Requisicao JWT local. Erro:${erro}  `, 'error')
                    return res.status(500).json({ erro: "Desculpe, mas ocorreu um erro com o seu token!" })
                }
                if (!usuario) {
                    logger.error(`ERRO - Requisicao JWT local. Erro:Usuario null  `, 'error')
                    return res.status(401).json()
                }
                req.user = usuario;
                const dadosUsuario = await database.Usuario.findByPk(usuario.usuarioId)
                req.headers.userId = dadosUsuario.id
                req.headers.userNome = dadosUsuario.nome
                if (usuario.senha.indexOf("$14") === 3) {
                    req.user.Admin = true
                    console.log("ADMIN" + " Nome: " + dadosUsuario.nome)
                } else {
                    return res.status(403).json({ erro: "Voce nao administrador!" })
                }
                return next();
            }
        )(req, res, next);
    }
}