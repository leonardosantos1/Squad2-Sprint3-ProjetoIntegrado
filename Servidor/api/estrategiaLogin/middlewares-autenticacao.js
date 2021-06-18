const passport = require('passport');
const database = require('../models')

module.exports = {
    local: (req, res, next) => {
        passport.authenticate(
            'local', { session: false },
            (erro, usuario, info) => {
                if (erro && erro.name === 'InvalidArgumentError') {
                    return res.status(401).json({ erro: "Argumento inválido!" })
                }
                if (erro) {
                    return res.status(500).json({ erro: "Argumento inválido!" })
                }
                if (!usuario) {
                    return res.status(401).json()
                }
                req.user = usuario
                return next()
            }
        )(req, res, next);
    },

    bearer: (req, res, next) => {
        passport.authenticate(
            'bearer', { session: false },
            (erro, usuario, info) => {
                if (erro && erro.name === 'JsonWebTokenError') {
                    return res.status(401).json({ erro: "Desculpe, mas ocorreu um erro com o seu token!" })
                }
                if (erro) {
                    return res.status(500).json({ erro: "Desculpe, mas ocorreu um erro com o seu token!" })
                }
                if (!usuario) {
                    return res.status(401).json()
                }
                req.user = usuario;
                return next();
            }
        )(req, res, next);
    },
    beareradm: (req, res, next) => {
        passport.authenticate(
            'bearer', { session: false },
            async(erro, usuario, info) => {
                if (erro && erro.name === 'JsonWebTokenError') {
                    return res.status(401).json({ erro: "Desculpe, mas ocorreu um erro com o seu token!" })
                }
                if (erro) {
                    return res.status(500).json({ erro: "Desculpe, mas ocorreu um erro com o seu token!" })
                }
                if (!usuario) {
                    return res.status(401).json()
                }
                req.user = usuario;
                const dadosUsuario = await database.Usuario.findByPk(usuario.usuario_id)
                    //console.log(dadosUsuario)

                if (usuario.senha.indexOf("$14") === 3) {
                    console.log("ADMIN" + " Nome: " + dadosUsuario.nome)
                } else {
                    return res.status(500).json({ erro: "Voce nao administrador!" })
                }

                return next();
            }
        )(req, res, next);
    }

}