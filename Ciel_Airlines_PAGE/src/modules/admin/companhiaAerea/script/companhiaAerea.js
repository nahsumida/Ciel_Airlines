function MessageStatus(msg, error){
    var pStatus = document.getElementById("status");

    if(error === true){
        pStatus.className = " statusError";
    }
    else{
        pStatus.className = 'statusSuccess';
    }
    pStatus.textContent = msg;
}


// LISTAR 
function fetchListarCompanhia(body){
    const requestOptions = {
        method: 'GET', headers: {'Content-Type' : "application/json"}, body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/selectCompanhiaAerea', requestOptions).then(T => T.json())
}

function ListarCompanhia(){
    const dataBody = document.getElementById('dataBody');
    fetchListarCompanhia()
        .then(customResponse => {
        if(customResponse.status === "SUCCESS"){
            
            // Limpa qualquer conteúdo anterior da tabela
            dataBody.innerHTML = '';

            // Preenche a tabela com os dados da resposta
            customResponse.payload.forEach(item => {
                const numero = item[0];
                const texto = item[1];

                const row = dataBody.insertRow();
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                cell1.textContent = numero;
                cell2.textContent = texto;
            });
        }else{
            MessageStatus("Erro ao listar Companhia...: " + customResponse.message, true);
            console.log(customResponse.message);
        }
        })
        .catch((e)=>{
            MessageStatus("Erro técnico ao listar... Contate o suporte.", true);
            console.log("Falha grave ao listar." + e)
        });
}
/*
INSERIR
*/
//validações campo vazio
function preencheuNomeCompanhia() {
    let resultado = false;
    const NomeSelecionado = document.getElementById('nomeCompanhia').value;
    if (NomeSelecionado.length > 0) {
        resultado = true;
    }
    return resultado;
}
//Funcao envia request para o endpoint para listar Cidades
function fetchInserir(body) {
    const requestOptions = {
        method: 'PUT', headers: { 'Content-Type': "application/json" }, body: JSON.stringify(body)
    };
    return fetch('http://localhost:3000/insertCompanhiaAerea', requestOptions).then(T => T.json())
}
//Funcao que insere cidade digitada
function inserirCompanhia() {
    if (!preencheuNomeCompanhia()) {
        MessageStatus("Preencha o nome da Companhia!", true);
        return
    }
    const nomeCompanhia = document.getElementById("nomeCompanhia").value;
    console.log(nomeCompanhia);
    fetchInserir({
        nomeCompanhiaAerea: nomeCompanhia
    })
        .then(customResponse => {
            if (customResponse.status === "SUCCESS") {
                MessageStatus("Companhia cadastrada... ", false);
            } else {
                MessageStatus("Erro ao cadastrar companhia...: " + customResponse.message, true);
                console.log(customResponse.message);
            }
        })
        .catch((e) => {
            MessageStatus("Erro técnico ao cadastrar... Contate o suporte.", true);
            console.log("Falha grave ao cadastrar." + e)
        });
}

// EXCLUIR
function fetchExcluir(body){
    const requestOptions = {
        method: 'DELETE', headers: {'Content-Type' : "application/json"}, body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/deleteCompanhiaAerea', requestOptions).then(T => T.json())
}


function Excluir() {
    var selectElementDelete = document.getElementById("dataSelectDelete"); //caixa de select
    var selectedIndex = selectElementDelete.selectedIndex; // Índice da opção selecionada
    var selectedOption = selectElementDelete.options[selectedIndex]; // Opção selecionada
    var selectedValue = selectedOption.value; //valor da opcao a ser excluída

    console.log("ID selecionado para exclusão:", selectedValue);
    fetchExcluir({
        idCompanhiaAerea: selectedValue,
    })
        .then(customResponse => {
            console.log("Resposta do servidor:", customResponse);
            if (customResponse.status === "SUCCESS") {
                MessageStatus("Companhia excluida... ", false);
            } else {
                MessageStatus("Erro ao excluir companhia...: " + customResponse.message, true);
                console.log(customResponse.message);
            }
        })
        .catch((e) => {
            MessageStatus("Erro técnico ao excluir... Contate o suporte.", true);
            console.log("Falha grave ao excluir." + e)
        });
}

// ALTERAR
function fetchAlterar(body) {
    const requestOptions = {
        method: 'POST', headers: { 'Content-Type': "application/json" }, body: JSON.stringify(body)
    };
    return fetch('http://localhost:3000/updateCompanhiaAerea', requestOptions).then(T => T.json())
}
function Alterar() {
    var selectElementUpdate = document.getElementById("dataSelectUpdate"); // caixa de seleçao do id
    var selectedIndex = selectElementUpdate.selectedIndex; // Índice da opção selecionada
    var selectedOption = selectElementUpdate.options[selectedIndex]; // Opção selecionada
    var selectedValue = selectedOption.value; // //valor da opcao a ser selecionada

    var newInput = document.getElementById("newnomeCompanhia"); // caixa de input
    const nomeCompanhia = newInput.value; // pega valor inserido pela pessoa
    console.log(nomeCompanhia); // verificar o valor
    fetchAlterar({
        idCompanhiaAerea: selectedValue,
        nomeCompanhiaAerea: nomeCompanhia
    })
        .then(customResponse => {
            if (customResponse.Companhia === "SUCCESS") {
                MessageStatus("Cidade alterada... ", false);
            } else {MessageStatus("Erro ao alterar Companhia...: " + customResponse.message, true);
            console.log(customResponse.message);
        }
    })
    .catch((e) => {
        MessageStatus("Erro técnico ao listar... Contate o suporte.", true);
        console.log("Falha grave ao listar." + e)
    });
}

document.addEventListener("DOMContentLoaded", function() {
    ListarCompanhia();

    const dataSelectDelete = document.getElementById('dataSelectDelete');
    const dataSelectUpdate = document.getElementById('dataSelectUpdate');
    listarComboBox(dataSelectDelete, fetchListarCompanhia);
    listarComboBox(dataSelectUpdate, fetchListarCompanhia);
});
