
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

/* LISTAR */

// Função para realizar a requisição de listagem de voos
function fetchListarVoo(body){
    const requestOptions = {
        method: 'GET', headers: {'Content-Type' : "application/json"}, body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/selectVoo', requestOptions).then(T => T.json())
}

// Função para listar aeroportos na tabela HTML
function ListarVoo(){
    const dataBody = document.getElementById('dataBody');
    fetchListarVoo()
    .then(customResponse => {
    if(customResponse.status === "SUCCESS"){
        
        // Limpa qualquer conteúdo anterior da tabela
        dataBody.innerHTML = '';

        // Preenche a tabela com os dados da resposta
        customResponse.payload.forEach(item => {
            const idvoo = item[0];
            const data = item[1];
            const horapart = item[2];
            const horacheg  = item[3];
            const preco = item[4];
            const aeronave = item[5];
            const trecho = item[6];

            const row = dataBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);
            const cell5 = row.insertCell(4);
            const cell6 = row.insertCell(5);
            const cell7 = row.insertCell(6);

            cell1.textContent = idvoo;
            cell2.textContent = data;
            cell3.textContent = trecho;
            cell4.textContent = horapart;
            cell5.textContent = horacheg;
            cell6.textContent = preco;
            cell7.textContent = aeronave;
        });
    }else{
        MessageStatus("Erro ao listar voo...: " + customResponse.message, true);
        console.log(customResponse.message);
    }
    })
    .catch((e)=>{
        MessageStatus("Erro técnico ao listar... Contate o suporte.", true);
        console.log("Falha grave ao listar." + e)
    });
}


/*CHAMADA DAS FUNÇÕES NO CARREGAMENTO DA PAGINA*/
document.addEventListener("DOMContentLoaded", function () {
    console.log("eu carreguei")
    ListarVoo();
});
