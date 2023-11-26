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
function fetchListar(body){
    const requestOptions = {
        method: 'GET', headers: {'Content-Type' : "application/json"}, body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/selectCompanhiaAerea', requestOptions).then(T => T.json())
}

function ListarCompanhia(){
    const dataBody = document.getElementById('dataBody');
    fetchListar()
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
function ListarCompanhiaComboBox() {
    const dataSelectDelete = document.getElementById('dataSelectDelete');
    const dataSelectUpdate = document.getElementById('dataSelectUpdate');
    fetchListar()
        .then(customResponse => {
            if (customResponse.status === "SUCCESS") {
                // Limpa qualquer conteúdo anterior da tabela
                dataSelectDelete.innerHTML = '';
                customResponse.payload.forEach(item => {
                    const idCompanhiaAerea = item[0];
                    const nome = item[1]; //colunas db
                    const option = document.createElement('option');
                    option.value = idCompanhiaAerea; // Valor da opção
                    option.text = `${nome}`; // Texto visível
                    dataSelectDelete.appendChild(option);
                });
            } else {
                MessageStatus("Erro ao listar cidades...: " + customResponse.message, true);
                console.log(customResponse.message);
            }
        })
        .catch((e) => {
            MessageStatus("Erro técnico ao listar... Contate o suporte.", true);
            console.log("Falha grave ao listar." + e)
        });
        fetchListar()
        .then(customResponse => {
            if (customResponse.status === "SUCCESS") {
                // Limpa qualquer conteúdo anterior da tabela
                    dataSelectUpdate.innerHTML = '';
                    customResponse.payload.forEach(item => {
                    const idCompanhiaAerea = item[0];
                    const nome = item[1]; //colunas db
                    const option = document.createElement('option');
                    option.value = idCompanhiaAerea; // Valor da opção
                    option.text = `${nome}`; // Texto visível
                    dataSelectUpdate.appendChild(option);
                });
            } else {
                MessageStatus("Erro ao listar cidades...: " + customResponse.message, true);
                console.log(customResponse.message);
            }
        })
        .catch((e) => {
            MessageStatus("Erro técnico ao listar... Contate o suporte.", true);
            console.log("Falha grave ao listar." + e)
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
    ListarCompanhiaComboBox();
    
});
