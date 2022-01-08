let arrayClientes = [];
let tabela;
let guardaidnomeouemail;
var search_terms = [];


// mostra qaul opção foi selecionada no dropbox
function changeFunc($i) {
    guardaidnomeouemail = $i;
    return guardaidnomeouemail;
}

// deixa o campo de texto em stand by, se digitar algo ele roda 
document.getElementById("campogenerico").addEventListener("keyup", mostraautocomplete());

// parte que não funciona 
// teoricamente mostraria o autocomplete do campo texto 
function mostraautocomplete() {

    // armazena o que foi digitado no campo 
    var valordigitado = document.getElementById("campogenerico").value;

    // busca os clientes no servidor e faz uma copia. 
    // não é uma boa tatica copiar o banco de dados para o cliente 
    // mas ainda não entendi como faz consulta no servidor 
    fetch('/users')
    .then(resposta => resposta.json())
    .then(texto => {
        arrayClientes = texto


        // verifica o que foi selecionado no dropbox e faz um array search_terms com tudo aquilo 
        //que bate com o que foi digitado no campo selecionado:
        // nao coloquei o id pq ano acho que faca sentido 

        // nome 
        if (guardaidnomeouemail == "name"){
            for (var i = 0; i < arrayClientes.length; i++) {
                if (arrayClientes["name"].includes(valordigitado)){
                    search_terms.push(arrayClientes[i].name);
                }
            }

        // email
        }else if (guardaidnomeouemail == "email"){
            for (var i = 0; i < arrayClientes.length; i++) {
                if (arrayClientes["email"].includes(valordigitado)){
                    search_terms.push(arrayClientes[i].email);
                }
            }
        }
        
        // esse faria uma lista de tudo que bate com o que foi digitado e mostraria no html
        let list = "";
        for (i=0; i<search_terms.length; i++) {
            list += '<li>' + search_terms[i] + '</li>';
        }
        document.getElementById("result").innerHTML = '<ul>' + list + '</ul>';
    })
}


// essa funcao eh chamada pelo botao buscar e chama as funcoaes correspondetes
// a opçao selecionada no dropbox
function executar(){
    if (guardaidnomeouemail == "id"){
        carregarid();
    }else if (guardaidnomeouemail == "name"){
        carregarcliente();
    }else if (guardaidnomeouemail == "email"){
        carregaremail();
    }  
}


// realiza a busca por nome
function carregarcliente() {
    fetch('/users')
    // mais uma vez eu pego o banco de dados e trago para o cliente
    // devo fazer ao contrario quando aprender 
        .then(resposta => resposta.json())
        .then(texto => {
            arrayClientes = texto
            tabela = [];
            // zera a mensagem de erro 
            document.getElementById("mensagemerro").innerHTML = "";

            // pega o valor digitado 
            let comparativo = document.getElementById("campogenerico").value;

            const field = "name";

            // compara com o banco de dados o calor digitado e poe numa tabela os matchs
            arrayClientes.forEach( function(cliente, index) {
                const name = cliente["name"];
                if (name.includes(comparativo)){
                    tabela.push(`<tr>
                    <td>${arrayClientes[index].id}</td>
                    <td>${arrayClientes[index].name}</td>
                    <td>${arrayClientes[index].email}</td>
                    </tr>`);
                }
            });

            // se encontrar algo mostra a tabela senao mostra mensagem de erro 
            if (tabela == "") {
                document.getElementById("mensagemerro").innerHTML = "Não encontrado: " + comparativo;
            }else{
                document.querySelector("#tblista tbody").innerHTML = tabela.join("");
            }
        })
}       

// realiza a busca por id 
function carregarid() {
     // mais uma vez eu pego o banco de dados e trago para o cliente
    // devo fazer ao contrario quando aprender 
    fetch('/users')
        .then(resposta => resposta.json())
        .then(texto => {
            arrayClientes = texto
            tabela = [];
            // zera a mensagem de erro 
            document.getElementById("mensagemerro").innerHTML = "";

            // pega o valor digitado 
            let comparativo = document.getElementById("campogenerico").value;
            
             const field = "id";

             // compara com o banco de dados o calor digitado e poe numa tabela os matchs
             arrayClientes.forEach( function(cliente, index) {
                 const id = cliente["id"];
                 if (id == comparativo){
                     tabela.push(`<tr>
                     <td>${arrayClientes[index].id}</td>
                     <td>${arrayClientes[index].name}</td>
                     <td>${arrayClientes[index].email}</td>
                     </tr>`);
                 }
            });

             // se encontrar algo mostra a tabela senao mostra mensagem de erro 
            if (tabela == "") {
                document.getElementById("mensagemerro").innerHTML = "Não encontrado: " + comparativo;
            }else{
                 document.querySelector("#tblista tbody").innerHTML = tabela.join("");
            }
        })
}       

// realiza a busca por email 
function carregaremail() {
     // mais uma vez eu pego o banco de dados e trago para o cliente
    // devo fazer ao contrario quando aprender 
    fetch('/users')
        .then(resposta => resposta.json())
        .then(texto => {
            arrayClientes = texto
            tabela = []
            // zera a mensagem de erro 
            document.getElementById("mensagemerro").innerHTML = "";
         
            // pega o valor digitado 
            let comparativo = document.getElementById("campogenerico").value;
            const field = "email";

            // compara com o banco de dados o calor digitado e poe numa tabela os matchs
            arrayClientes.forEach( function(cliente, index) {
                const email = cliente["email"];
                if (email.includes(comparativo)){
                    tabela.push(`<tr>
                    <td>${arrayClientes[index].id}</td>
                    <td>${arrayClientes[index].name}</td>
                    <td>${arrayClientes[index].email}</td>
                    </tr>`);
                }
            });

             // se encontrar algo mostra a tabela senao mostra mensagem de erro 
            if (tabela == "") {
                document.getElementById("mensagemerro").innerHTML = "Não encontrado: " + comparativo;
            }else{
                document.querySelector("#tblista tbody").innerHTML = tabela.join("");
            }
        })
}       