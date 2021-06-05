const passport = require('passport');

module.exports={
    local: (req,res,next)=>{
        passport.authenticate(
            'local',
            {session:false},
            (erro,usuario,info)=>{
                if(erro && erro.name === 'InvalidArgumentError'){
                    return res.status(401).json({erro: erro.message})
                }

                if(erro){
                    return res.status(500).json({erro: erro.message})
                }

                if(!usuario){
                    return res.status(401).json()
                }

                req.user = usuario
                return next()
            }
        )(req,res,next);
    },

    bearer:(req,res,next)=>{//precisa atualizar, esta com bug
        passport.authenticate(
            'bearer',
            {session: false},
            (erro, usuario, info)=>{
                if(erro && erro.name === 'JsonWebTokenError'){
                    return res.status(401).json({erro: erro.message})
                }

                if(erro){
                    return res.status(500).json({erro: erro.message})
                }
                
                if(!usuario){
                    return res.status(401).json()
                }
                console.log(req)
                req.body = usuario;
                return next();
            }
        )(req,res,next);
    }
       
}