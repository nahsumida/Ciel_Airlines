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
function fetchListarVenda(body){
    const requestOptions = {
        method: 'GET', headers: {'Content-Type' : "application/json"}, body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/selectVenda', requestOptions).then(T => T.json())
}

// Função para listar aeroportos na tabela HTML
function ListarVenda(){
    const dataBody = document.getElementById('dataBody');
    fetchListarVenda()
    .then(customResponse => {
    if(customResponse.status === "SUCCESS"){
        
        // Limpa qualquer conteúdo anterior da tabela
        dataBody.innerHTML = '';

        // Preenche a tabela com os dados da resposta
        customResponse.payload.forEach(item => {
            const idvenda = item[0];
            const nome = item[1];
            const email = item[2];
            const assento  = item[3];
            const pagamento = item[4];
            const horapart = item[5];
            const preco = item[6];
            const xxx = item[7];
            const yyy = item[8];

            const row = dataBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);
            const cell5 = row.insertCell(4);
            const cell6 = row.insertCell(5);
            const cell7 = row.insertCell(6);
            const cell8 = row.insertCell(7);
            const cell9 = row.insertCell(8);

            cell1.textContent = idvenda;
            cell2.textContent = nome;
            cell3.textContent = email;
            cell4.textContent =  assento;
            cell5.textContent = pagamento;
            cell6.textContent = horapart;
            cell7.textContent = preco;
            cell8.textContent = xxx;
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
        ListarVenda();
        
    });