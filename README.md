	
<h1 align="center">
  <h2>API para controle de itens</h2>
</h1>

Obs: Variaveis de ambiente que estao no .env!!!
DB_USER
DB_PASSWORD
DB_DATABASE
DB_PORT
DB_HOST


Obs: Variaveis de ambiente que estao no .env!!!
DB_USER_TEST
DB_PASSWORD_TEST
DB_DATABASE_TEST
DB_PORT_TEST
DB_HOST_TEST
USER_ADMIN_CPF
USER_CPF
CHAVE_JWT

-----------------------------------------------------------------------------------------------

Utilizamos o database chamado "controle"

Criar arquivo .env, e colocar a criar CHAVE_JWT
Gerar chave aleatória JWT:
node -e "console.log( require('crypto').randomBytes(256).toString('base64'))" 
colocar o valor desse comando na variavel CHAVE_JWT

Nessa etapa do projeto decidimos criar uma branch separada chamada "TypeScript" onde está todo o nosso desenvolvimento da sprint 4 do projeto

Para clonar essa parte do projeto, você consegue utilizando o comando:
git clone -b TypeScript https://github.com/dev-ViniciusMonteiro/Squad2-Sprint3-ProjetoIntegrado 

API agora não necessita mais utilizar os comandos como: npx sequelize-cli db:migrate, basta inicia-la com o comando "npm run dev", e ela criará as tabelas e subirá normalmente

Disponibilizamos coleções do Postman das tabelas:
Usuario, Login, Tipo, Item

Creio que para utilizar a colecao do Postman disponibilizada basta arrastar para dentro do Postman que aparecerá as mesma para os testes.

Requisicoes:
 -Cadastro usuario: {"nome":"xxxxxx", "cpf":"xxxxxxxxxxx", "senha":"xxx"}
   obs: Senha opicional, caso queira criar ja o login junto ao usuario enviar a senha junto.
 -Login: {"cpf": "xxxxxxxxxxx", "senha":"xxx"}
  obs: Pode ser utilizado cpf ou id
 -cadastro administrador: Subir cargo um usuario - login/:admin {"cpf":"x","senha":"xxxx"} //senha mais forte e sem acesso ao banco evitando assim possiveis brechas
   obs: Somente admin ira add Admin
