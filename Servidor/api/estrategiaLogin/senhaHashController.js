const bcrypt = require('bcrypt')

class senhaHash{
       async adiconaSenha(req){
        const senha = req.body.senha
        const custoHash = 12;
        //console.log(senha)
         if(!senha){
            throw new Error("Desculpe,senha invalida!")
         }
        const senhaHash = await bcrypt.hash(senha, custoHash)
        console.log(senhaHash)
        return senhaHash
    }

    //validacao da senha!!!
}
module.exports = new senhaHash()

  