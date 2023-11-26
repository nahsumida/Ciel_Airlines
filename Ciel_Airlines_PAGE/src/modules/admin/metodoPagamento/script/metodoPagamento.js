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

//LISTAR

// Função para realizar a requisição de listagem
function fetchListar(body){
    const requestOptions = {
        method: 'GET', headers: {'Content-Type' : "application/json"}, body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/selectMetodoPagamento', requestOptions).then(T => T.json())
}

function ListarMetodo(){
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
    ListarMetodo();
});
