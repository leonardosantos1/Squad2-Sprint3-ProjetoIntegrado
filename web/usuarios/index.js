/*
    Para funcionar colocar na API cors() - 
    1- npm install cors 
    2- api/server.ts :
      - var cors = require('cors')
      - app.use(cors())
*/

const listar = async() => {
    const response = await fetch('http://127.0.0.1:3000/usuario/');
    const myJson = await response.json();
    let elemento = ''
    myJson.forEach(element => {
        let aux = `<tr><td>${element.nome}</td><td>${element.cpf}</td></tr>`
        elemento += aux
    });
    var element = document.getElementById('tabela');

    element.innerHTML = elemento
}

const cadastrar = async() => {
    var xhttp = new XMLHttpRequest();
    let $ = document.querySelector.bind(document); //precisa do bind pra manter o document

    nome = document.getElementById('nome').value
    cpf = document.getElementById('cpf').value
    senha = document.getElementById('senha').value



    await xhttp.open("POST", "http://127.0.0.1:3000/usuario/", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(`{
      "nome":"${nome}",
      "cpf":"${cpf}",
      "senha":"${senha}"
  }`);
    console.log(await xhttp.getAllResponseHeaders)
    alert(`Login:${cpf}  Senha:${senha}`)



};