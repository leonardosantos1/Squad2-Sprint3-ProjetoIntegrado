const database = require('../models')

module.exports = {
    async listarItensUsuario(req, res) {
        try {
            const itensUsu = await database.item_usuario.findAll()
            return res.status(200).json(itensUsu)
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({ erro: "Desculpe, mas nao foi possivel listar os itens usuarios!" })
        }
    },
    async listarItemUsuario(req, res) {
        try {
            const itemUsu = await database.item_usuario.findByPk(req.params.id)
            return res.status(200).json(trataItemUsuario(itemUsu))
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({ erro: "Desculpe, mas nao foi possivel listar os item usuario!" })
        }
    },
    async inserirItemUsuario(req, res) {
        try {
            if (req.is('json')) {
                const itemUsu = await database.item_usuario.create(req.body)
                return res.status(201).json(trataItemUsuario(itemUsu))
            } else {
                throw new Error("Desculpe, mas nao foi possivel inserir o item usuario desejado!")
            }
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({ erro: "Desculpe, mas nao foi possivel inserir o item usuario desejado!" })
        }
    },
    async atualizarItemUsuario(req, res) {
        try {
            if (req.is('json')) {
                const itemUsu = await database.item_usuario.findByPk(req.params.id)
                await itemUsu.update(req.body)
                res.status(200).json(trataItemUsuario(itemUsu))
            } else {
                throw new Error("Desculpe, mas nao foi possivel atualizar o item usuario desejado!")
            }
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({ erro: "Desculpe, mas nao foi possivel atualizar o item usuario desejado!" })
        }

    },
    async deletarItemUsuario(req, res) {
        try {
            const itemUsu = await database.item_usuario.findByPk(req.params.id)
            await itemUsu.destroy(req.body)
            return res.status(200).json({ msg: "Item usuario deletado com sucesso" })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({ erro: "Desculpe, mas nao foi possivel deletar o item usuario desejado!" })
        }

    }
}

function trataItensUsuario(arr) {
    let itensUsuario = [];
    for (i = 0; i < arr.length; i++) {
        itensUsuario.push({ id: arr[i].id, item_id: arr[i].item_id, usuario_id: arr[i].usuario_id })
    }
    return itensUsuario
}

function trataItemUsuario(itemUsu) {
    return { id: itemUsu.id, item_id: itemUsu.item_id, usuario_id: itemUsu.usuario_id }
}