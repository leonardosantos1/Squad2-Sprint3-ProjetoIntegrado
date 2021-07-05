# Squad2-Sprint3-ProjetoIntegrado
Projeto integrado da squade 2 na sprint 5

Vinicius:
 -Implementou LOG
 
Leonardo:
 -Implementou Kubernets
 
Gustavo:
 -Melhoria no tratamento
 
Obs: Variaveis de ambiente que estao no .env!!!
DB_USER
DB_PASSWORD
DB_DATABASE
DB_PORT
DB_HOST

-----------------------------------------------------------------------------------------------
Projeto integrado da squade 2 na sprint 4

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

Leonardo:
    Refatoração de código para Typescript
    Formatação para camelCase
    Tratamento de erros (console.log)
    Aplicação padrão REST nas rotas da API
    Coleção Postman
    Tentativa de implementação do Dockerfile
    e  Tentativa de implementação parte Kubernetes

Gustavo:
    Tratamento de Dados
    Ajuste de nomes de variaveis com nomes estranhos
    Tentativa de implementação do Dockerfile e Kubernetes

Vinicius:
    Não exposicao da senha hash
    Aplicação padrão REST nas rotas da API
    Geração de Login Administrator
    Conseguir efetuar login com o cpf do usuario
    Criação de Login junto a Usuario
    Subir Cargo Administrador
    Tentativa de implementação do Dockerfile

Os tópicos não listados ja estavam implementados em nossa API na versão anterior

A parte de docker e kubernetes tentamos implementar mas no final não tivemos sucesso, deixamos um dos Dockerfiles e alguns arquivos kubernetes que utilizamos em nossas tentativas

Requisicoes:
 -Cadastro usuario: {"nome":"xxxxxx", "cpf":"xxxxxxxxxxx", "senha":"xxx"}
   obs: Senha opicional, caso queira criar ja o login junto ao usuario enviar a senha junto.
 -Login: {"cpf": "xxxxxxxxxxx", "senha":"xxx"}
  obs: Pode ser utilizado cpf ou id
 -cadastro administrador: Subir cargo um usuario - login/:admin {"cpf":"x","senha":"xxxx"} //senha mais forte e sem acesso ao banco evitando assim possiveis brechas
   obs: Somente admin ira add Admin
