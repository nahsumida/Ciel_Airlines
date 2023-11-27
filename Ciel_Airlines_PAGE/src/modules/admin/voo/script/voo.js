
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

// Função para realizar a requisição de listagem de aeroportos
function fetchListarAero(body){
    const requestOptions = {
        method: 'GET', headers: {'Content-Type' : "application/json"}, body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/selectAeroporto', requestOptions).then(T => T.json())
}

// Função para listar aeroportos na tabela HTML
function ListarAeroporto(){
    const dataBody = document.getElementById('dataBodyAero');
    fetchListarAero()
    .then(customResponse => {
    if(customResponse.status === "SUCCESS"){
        
        // Limpa qualquer conteúdo anterior da tabela
        dataBody.innerHTML = '';

        // Preenche a tabela com os dados da resposta
        customResponse.payload.forEach(item => {
            const idaero = item[0];
            const nome = item[1]
            const idcidade = item[3];
            const sigla = item[4]

            const row = dataBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);

            cell1.textContent = idaero;
            cell2.textContent = idcidade;
            cell3.textContent = nome;
            cell4.textContent = sigla;
        });
    }else{
        MessageStatus("Erro ao listar Aeroporto...: " + customResponse.message, true);
        console.log(customResponse.message);
    }
    })
    .catch((e)=>{
        MessageStatus("Erro técnico ao listar... Contate o suporte.", true);
        console.log("Falha grave ao listar." + e)
    });
}

// Função para realizar a requisição de listagem de trechos
function fetchListarTrecho(body){
    const requestOptions = {
        method: 'GET', headers: {'Content-Type' : "application/json"}, body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/selectTrecho', requestOptions).then(T => T.json())
}

// Função para listar trechos na tabela HTML
function ListarTrecho(){
    const dataBody = document.getElementById('dataBody');
    fetchListarTrecho()
    .then(customResponse => {
    if(customResponse.status === "SUCCESS"){
        
        // Limpa qualquer conteúdo anterior da tabela
        dataBody.innerHTML = '';

        // Preenche a tabela com os dados da resposta
        customResponse.payload.forEach(item => {
            const idTrecho = item[0];
            const saida = item[3];
            const chegada = item[4];


            const row = dataBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);

            cell1.textContent = idTrecho;
            cell2.textContent = saida;
            cell3.textContent = chegada;

        });
    }else{
        MessageStatus("Erro ao listar trechos...: " + customResponse.message, true);
        console.log(customResponse.message);
    }
    })
    .catch((e)=>{
        MessageStatus("Erro técnico ao listar... Contate o suporte.", true);
        console.log("Falha grave ao listar." + e)
    });
}
