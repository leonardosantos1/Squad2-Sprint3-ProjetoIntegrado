const passport = require('passport');

module.exports={
    local: (req,res,next)=>{
        passport.authenticate(
            'local',
            {session:false},
            (erro,usuario,info)=>{
                if(erro && erro.name === 'InvalidArgumentError'){
                    return res.status(401).json({erro:"Argumento inválido!"})
                }
                if(erro){
                    return res.status(500).json({erro:"Argumento inválido!"})
                }
                if(!usuario){
                    return res.status(401).json()
                }
                req.user = usuario
                return next()
            }
        )(req,res,next);
    },

    bearer:(req,res,next)=>{
        passport.authenticate(
            'bearer',
            {session: false},
            (erro, usuario, info)=>{
                if(erro && erro.name === 'JsonWebTokenError'){
                    return res.status(401).json({erro:"Desculpe, mas ocorreu um erro com o seu token!"})
                }
                if(erro){
                    return res.status(500).json({erro:"Desculpe, mas ocorreu um erro com o seu token!"})
                }
                if(!usuario){
                    return res.status(401).json()
                }
                req.user = usuario;
                return next();
            }
        )(req,res,next);
    }
       
}