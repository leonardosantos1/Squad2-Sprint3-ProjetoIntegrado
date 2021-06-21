const bcrypt = require('bcrypt')

class senhaHash {
    async adicionaSenha(req) {
        const senha = req.body.senha
        const custoHash = 12;
        if (!senha) {
            throw new Error("Desculpe,senha invalida!")
        }
        const senhaHash = await bcrypt.hash(senha, custoHash)
        return senhaHash
    }
    async adicionaSenhaAdm(req) {
        const senha = req.body.senha
        const custoHash = 14;
        if (!senha) {
            throw new Error("Desculpe,senha invalida!")
        }
        const senhaHash = await bcrypt.hash(senha, custoHash)
        return senhaHash
    }
}
module.exports = new senhaHash()