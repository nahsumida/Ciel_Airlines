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

function fetchListar(body){
    const requestOptions = {
        method: 'GET', headers: {'Content-Type' : "application/json"}, body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/listarCidade', requestOptions).then(T => T.json())
}

function fetchExcluir(body){
    const requestOptions = {
        method: 'DELETE', headers: {'Content-Type' : "application/json"}, body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/excluirCidade', requestOptions).then(T => T.json())
}

function inserirAeronave(){
    const dataSelect = document.getElementById('dataSelect');
    fetchListar()
        .then(customResponse => {
        if(customResponse.status === "SUCCESS"){
            dataSelect.innerHTML = '';

            customResponse.payload.forEach(item => {
                const idCidade = item[0];
                const nome = item[1]; //colunas db

                const option = document.createElement('option');
                option.value = idCidade; // Valor da opção
                option.text = `${nome}`; // Texto visível

                dataSelect.appendChild(option);
            });
        }else{
            MessageStatus("Erro ao listar cidades...: " + customResponse.message, true);
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
        idCidade: selectedValue, 
    })
        .then(customResponse => {
        if(customResponse.status === "SUCCESS"){
            MessageStatus("Cidade excluida... ", false);
        }else{
            MessageStatus("Erro ao listar cidades...: " + customResponse.message, true);
            console.log(customResponse.message);
        }
        })
        .catch((e)=>{
            MessageStatus("Erro técnico ao listar... Contate o suporte.", true);
            console.log("Falha grave ao listar." + e)
        });
}

document.addEventListener("DOMContentLoaded", function() {
    inserirAeronave();
    const button = document.getElementById("btnExcluir");
    var selectElement = document.getElementById("dataSelect");

    if (button) {
        button.addEventListener('click', function() {
            var selectedIndex = selectElement.selectedIndex; // Índice da opção selecionada
            var selectedOption = selectElement.options[selectedIndex]; // Opção selecionada
            var selectedValue = selectedOption.value; 
    
            excluir(selectedValue);
        });
    }
});
