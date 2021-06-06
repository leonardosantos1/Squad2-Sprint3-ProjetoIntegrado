# Squad2-Sprint3-ProjetoIntegrado
Projeto integrado da squade 2 na sprint 3

Utilizamos o database chamado "controle"
O comando para conseguir rodar todas as migrations use o "npx sequelize-cli db:migrate"
O comando para conseguir deletar todas as migrations use o "npx sequelize-cli db:migrate:undo:all"

Criar arquivo .env, e colocar a criar CHAVE_JWT
Gerar chave alheatoria JWT:
node -e "console.log( require('crypto').randomBytes(256).toString('base64'))" 
colocar o valor desse comando na variavel CHAVE_JWT

Tabelas:
    -tipo (Gustavo)
    -Usuario (Vinicius)
    -item, item_usuario, login e resrerva (Leonardo)

Migration e model:
    -Leonardo

JWT:
    -Vinicius

Tratamento de dados:
    -Gustavo

Passo a Passo:
1) Criar usuario (/usuario/inserir)
2) Criar login do usuario criado (/login/criar)
3) Fazer login com o login criado (/login/entrar) (nessa etapa será gerado o token local)
4) Criar tipo (tipo/inserir)
5) Criar item (item/inserir)
6) Criar ItemUsuario (itemUsuario/inserir)
7) Criar Reserva (reserva/inserir)

OBS: Para todas as rotas que foram de inserir, atualizar e deletar, voce deve ter o token de acesso (gerado na etapa 3), com exceçao das rotas de inserir do usuario e criar o login.

USUARIO:
    atributos:
    nome(varchar), cpf(varchar)

LOGIN:
    atributos:
    id(integer), usuario_id(integer), senha(varchar) 

TIPO:
    atributos:
    categoria(varchar), tipo_id(integer)   

ITEM_USUARIO:
    atributos:
    item_id(integer), usuario_id(integer)

RESERVA:
    atributos:
    data_reserva(date), checkout(date), item_usuario_id(integer)    



