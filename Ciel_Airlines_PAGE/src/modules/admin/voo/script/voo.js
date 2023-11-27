
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
            const aerop1 = item[6];
            const aerop2 = item[7];

            const row = dataBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);
            const cell5 = row.insertCell(4);
            const cell6 = row.insertCell(5);
            const cell7 = row.insertCell(6);
            const cell8 = row.insertCell(7);

            cell1.textContent = idvoo;
            cell2.textContent = data;
            cell3.textContent = aerop1;
            cell4.textContent =  horapart;
            cell5.textContent = aerop2;
            cell6.textContent = horacheg;
            cell7.textContent = preco;
            cell8.textContent = aeronave;
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
function listarComboBoxVoo(element) {
    fetchListarVoo()
        .then(customResponse => {
            if (customResponse.status === "SUCCESS") {
                element.innerHTML = '';

                // Looping que cria opções na caixa de seleção
                customResponse.payload.forEach(item => {
                    const id = item[0];

                    const option = document.createElement('option');
                    option.value = id; // Valor da opção
                    option.text = `${id}`; // Texto visível

                    // Adiciona a opção ao elemento
                    element.appendChild(option);
                });
            } else {
                MessageStatus("Erro ao listar elementos...: " + customResponse.message, true);
                console.log(customResponse.message);
            }
        })
        .catch((e) => {
            MessageStatus("Erro técnico ao listar... Contate o suporte.", true);
            console.log("Falha grave ao listar." + e);
        });
}
function fetchListarTrecho(body){
    const requestOptions = {
        method: 'GET', headers: {'Content-Type' : "application/json"}, body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/selectTrecho', requestOptions).then(T => T.json())
}

function ListarTrechoComboBox() {
    const newTrecho = document.getElementById('newTrecho');
    fetchListarTrecho()
        .then(customResponse => {
            if (customResponse.status === "SUCCESS") {
                // Limpa qualquer conteúdo anterior da tabela
                dataSelectDelete.innerHTML = '';
                customResponse.payload.forEach(item => {
                    const idTrecho = item[0];
                    const nome1 = item[3]; //colunas db
                    const nome2 = item[5];
                    const option = document.createElement('option');
                    option.value = idTrecho; // Valor da opção
                    option.text = `${nome1} - ${nome2}`; // Texto visível
                    newTrecho.appendChild(option);
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

function fetchListarAeronave(body){
    console.log("cheguei no fim")
    const requestOptions = {
        method: 'GET', headers: {'Content-Type' : "application/json"}, body: JSON.stringify(body)
    };

return fetch('http://localhost:3000/selectAeronave', requestOptions).then(T => T.json())
}

function ListarAeronaveComboBox() {
    const newTrecho = document.getElementById('newAeronave');
    fetchListarAeronave()
        .then(customResponse => {
            if (customResponse.status === "SUCCESS") {
                // Limpa qualquer conteúdo anterior da tabela
                dataSelectDelete.innerHTML = '';
                customResponse.payload.forEach(item => {
                    const idaero = item[0];
                    const nome = item[5]; //colunas db
                    const option = document.createElement('option');
                    option.value = idaero; // Valor da opção
                    option.text = `${nome}`; // Texto visível
                    newAeronave.appendChild(option);
                });
            } else {
                MessageStatus("Erro ao listar aeronaves...: " + customResponse.message, true);
                console.log(customResponse.message);
            }
        })
        .catch((e) => {
            MessageStatus("Erro técnico ao listar... Contate o suporte.", true);
            console.log("Falha grave ao listar." + e)
        });
}
/*CHAMADA DAS FUNÇÕES NO CARREGAMENTO DA PAGINA*/
document.addEventListener("DOMContentLoaded", function () {
    console.log("eu carreguei")
    ListarVoo();
    ListarTrechoComboBox();

    // chama a funcao para listar voos dentro da caixa select delete e update
    const dataSelectDelete = document.getElementById('dataSelectDelete');
    listarComboBoxVoo(dataSelectDelete);
    const dataSelectUpdate = document.getElementById('dataSelectUpdate');
    listarComboBoxVoo(dataSelectUpdate);

    // Chama a função para listar aeronaves na caixa de seleção de update 'newAeronave'
    ListarAeronaveComboBox();
});
