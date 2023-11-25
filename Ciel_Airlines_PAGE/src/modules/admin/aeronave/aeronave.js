function MessageStatus(msg, error){
    var pStatus = document.getElementById("status");

    if(error === true){
        pStatus.className = " statusError";
    }
    else{
        pStatus.className = 'statusSuccess'
    }
    pStatus.textContent = msg;
}

//Funcao envia request para o endpoint
function fetchListar(body){
    const requestOptions = {
        method: 'GET', headers: {'Content-Type' : "application/json"}, body: JSON.stringify(body)
    };

return fetch('http://localhost:3000/selectAeronave', requestOptions).then(T => T.json())
}


//funcao para preencher a tabela HTML com os dados obtidos
function preencherTabela(data) {
    const tblAeronaveDados = document.getElementById('tblAeronaveDados');

    // Limpa qualquer conteúdo anterior da tabela
    tblAeronaveDados.innerHTML = '';

    // Itera sobre os dados e preenche a tabela
    data.forEach((item) => {
        // Cria a linha HTML com os dados do item (de cada iteração)
        const row = tblAeronaveDados.insertRow();

        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);
        const cell6 = row.insertCell(5);

        
        cell1.value = item.ID;
        cell2.textContent = item.Modelo;
        cell3.textContent = item.NumIdentificacao;
        cell4.textContent = item.Fabricante;
        cell5.textContent = item['Companhia Aerea']; 
        cell6.textContent = item.Ano;
    });
}

function ListarAeronave() {
    const dataBody = document.getElementById('dataBody');

    fetchListar()
        .then((customResponse) => {
            if (customResponse.status === 'SUCCESS') {
                // Chama a função para preencher a tabela 
                preencherTabela(customResponse.payload);
            } else {
                MessageStatus('Erro ao listar Aeronave...: ' + customResponse.message, true);
                console.log(customResponse.message);
            }
        })
        .catch((e) => {
            MessageStatus('Erro técnico ao listar... Contate o suporte.', true);
            console.log('Falha grave ao listar.' + e);
        });
}

document.addEventListener('DOMContentLoaded', function () {
    ListarAeronave();
});