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


// EXCLUIR
function fetchExcluir(body){
    const requestOptions = {
        method: 'DELETE', headers: {'Content-Type' : "application/json"}, body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/excluirCompanhiaAerea', requestOptions).then(T => T.json())
}

function inserirAeronave(){
    const dataSelect = document.getElementById('dataSelect');
    fetchListar()
        .then(customResponse => {
        if(customResponse.status === "SUCCESS"){
            dataSelect.innerHTML = '';

            customResponse.payload.forEach(item => {
                const idmetodo = item[0];
                const nome = item[1]; //colunas db

                const option = document.createElement('option');
                option.value = idmetodo; // Valor da opção
                option.text = `${nome}`; // Texto visível

                dataSelect.appendChild(option);
            });
        }else{
            MessageStatus("Erro ao listar companhia aérea...: " + customResponse.message, true);
            console.log(customResponse.message);
        }
        })
        .catch((e)=>{
            MessageStatus("Erro técnico ao listar... Contate o suporte.", true);
            console.log("Falha grave ao listar." + e)
        });
}

function excluir(selectedValue){
    fetchExcluir({
        idCompanhiaAerea: selectedValue, 
    })
        .then(customResponse => {
        if(customResponse.status === "SUCCESS"){
            MessageStatus("Companhia aérea excluida... ", false);
        }else{
            MessageStatus("Erro ao excluir companhia aérea...: " + customResponse.message, true);
            console.log(customResponse.message);
        }
        })
        .catch((e)=>{
            MessageStatus("Erro técnico ao listar... Contate o suporte.", true);
            console.log("Falha grave ao excluir." + e)
        });
}

document.addEventListener("DOMContentLoaded", function() {
    inserirAeronave();
    const button = document.getElementById("btnExcluir");
    var selectElement = document.getElementById("dataSelect");

    button.addEventListener('click', function() {
        var selectedIndex = selectElement.selectedIndex; // Índice da opção selecionada
        var selectedOption = selectElement.options[selectedIndex]; // Opção selecionada
        var selectedValue = selectedOption.value; 

        excluir(selectedValue);
    });
    
});
