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

    return fetch('http://localhost:3000/listarAeronave', requestOptions).then(T => T.json())
}

function fetchExcluir(body){
    const requestOptions = {
        method: 'DELETE', headers: {'Content-Type' : "application/json"}, body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/excluirAeronave', requestOptions).then(T => T.json())
}

function inserirAeronave(){
    const dataSelect = document.getElementById('dataSelect');
    fetchListar()
        .then(customResponse => {
        if(customResponse.status === "SUCCESS"){
            dataSelect.innerHTML = '';

            customResponse.payload.forEach(item => {
                const modelo = item[0];
                const numid = item[1]; //colunas db
                
                const option = document.createElement('option');
                option.value = numid; // Valor da opção
                option.text = `${modelo}`; // Texto visível
                

                dataSelect.appendChild(option);
            });
        }else{
            MessageStatus("Erro ao listar metodos...: " + customResponse.message, true);
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
        idmetodo: selectedValue, 
    })
        .then(customResponse => {
        if(customResponse.status === "SUCCESS"){
            MessageStatus("Metodo excluido... ", false);
        }else{
            MessageStatus("Erro ao listar metodos...: " + customResponse.message, true);
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
