

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
            const chegada = item[5];


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


// Função para listar opções de trecho em um elemento de caixa de seleção
// Essa função é diferente das outras de listar comboBox, pois o id é o mesmo valor que aparecerá
// no texto visível da caixa
function listarComboBoxTrecho(element) {
    fetchListarTrecho()
        .then(customResponse => {
            if (customResponse.status === "SUCCESS") {
                element.innerHTML = '';

                // Adiciona a opção inicial "Selecione:"
                const selectOption = document.createElement('option');
                selectOption.value = ''; // Valor vazio
                selectOption.text = 'Selecione:'; // Texto visível
                element.appendChild(selectOption);

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



// CADASTRAR


function fetchInserir(body){
    const requestOptions = {
        method: 'PUT', headers: {'Content-Type' : "application/json"}, body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/insertTrecho', requestOptions).then(T => T.json())
}

function inserirTrecho(){
    var selectSaida = document.getElementById("aeroSaida");
    var selectChegada = document.getElementById("aeroChegada");

    var selectedIndex = selectSaida.selectedIndex; // Índice da opção selecionada
    var selectedOption = selectSaida.options[selectedIndex]; // Opção selecionada
    var selectedSaida = selectedOption.value; 

    var selectedIndex1 = selectChegada.selectedIndex; // Índice da opção selecionada
    var selectedOption1 = selectChegada.options[selectedIndex1]; // Opção selecionada
    var selectedChegada = selectedOption1.value;

    fetchInserir({
        aeroSaida : selectedSaida,
        aeroChegada : selectedChegada
    })
        .then(customResponse => {
        if(customResponse.status === "SUCCESS"){
            MessageStatus("Trecho cadastrado... ", false);
        }else{
            MessageStatus("Erro ao cadastrar TRECHO...: " + customResponse.message, true);
            console.log(customResponse.message);
        }
        })
        .catch((e)=>{
            MessageStatus("Erro técnico ao cadastrar... Contate o suporte.", true);
            console.log("Falha grave ao cadastrar." + e)
        });
}

/*
EXCLUIR
*/

// Funcao para enviar uma solicitação de exclusao para o servidor
function fetchExcluir(body){
    const requestOptions = {
        method: 'DELETE', headers: {'Content-Type' : "application/json"}, body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/deleteTrecho', requestOptions).then(T => T.json())
}

function Excluir(){
    var selectElementDelete = document.getElementById("dataSelectDelete"); //caixa de select
    var selectedIndex = selectElementDelete.selectedIndex; // Índice da opção selecionada
    var selectedOption = selectElementDelete.options[selectedIndex]; // Opção selecionada
    var selectedValue = selectedOption.value; //valor da opcao a ser excluída

    fetchExcluir({
        idTrecho: selectedValue, 
    })
        .then(customResponse => {
        if(customResponse.status === "SUCCESS"){
            MessageStatus("[Sucesso]Trecho excluído... ", false);
        }else{
            MessageStatus("Erro ao listar trecho...: " + customResponse.message, true);
            console.log(customResponse.message);
        }
        })
        .catch((e)=>{
            MessageStatus("Erro técnico ao listar... Contate o suporte.", true);
            console.log("Falha grave ao listar." + e)
        });
}



/*
ALTERAR
*/

// Funcao para enviar uma solicitação de alteração para o servidor
function fetchAlterarTrecho(body) {
    const requestOptions = {
        method: 'POST', headers: { 'Content-Type': "application/json" }, body: JSON.stringify(body)
    };
    return fetch('http://localhost:3000/updateTrecho', requestOptions).then(T => T.json())
}

// Funcao para alterar um trecho na tabela com a(s) nova(s) informaçao(oes)
// Funcao para alterar um trecho na tabela com a(s) nova(s) informaçao(oes)
function AlterarTrecho(){
    var selectElementUpdate = document.getElementById("dataSelectUpdate"); // caixa de seleçao do id
    var selectedIndex = selectElementUpdate.selectedIndex; // Índice da opção selecionada
    var selectedOption = selectElementUpdate.options[selectedIndex]; // Opção selecionada
    var selectedValue = selectedOption.value; // //valor da opcao a ser selecionada

    var newAeroSaida = document.getElementById("newaeroSaida");
    var newAeroChegada = document.getElementById("newaeroChegada");

    // Obtém os valores selecionados
    var selectedSaida = newAeroSaida.value; 
    var selectedChegada = newAeroChegada.value;

    fetchAlterarTrecho({
        idTrecho: selectedValue,
        aeroSaida: selectedSaida,
        aeroChegada: selectedChegada
    })
        .then(customResponse => {
            if (customResponse.status === "SUCCESS") {
                MessageStatus("Trecho alterado com sucesso.", false);
            } else {
                MessageStatus("Erro ao alterar trecho: " + customResponse.message, true);
                console.log(customResponse.message);
            }
        })
        .catch((e) => {
            MessageStatus("Erro técnico ao alterar trecho. Contate o suporte.", true);
            console.log("Falha grave ao alterar trecho." + e);
        });
}


//execução do script no carregamento da página, chamada das funcoes
document.addEventListener("DOMContentLoaded", function() {
    // Chama a função para listar aeroportos na tabela 1
    ListarAeroporto();

    // Chama a função para listar trechos na tabela
    ListarTrecho();

    // Chama a função para listar aeroportos na caixa de seleção 'aeroSaida'
    const aeroSaida = document.getElementById('aeroSaida');
    listarComboBox(aeroSaida,fetchListarAero);

    // Chama a função para listar aeroportos na caixa de seleção 'aeroChegada'
    const aeroChegada = document.getElementById('aeroChegada');
    listarComboBox(aeroChegada,fetchListarAero);

    // chama a funcao para listar trechos dentro da caixa select delete e update
    const dataSelectDelete = document.getElementById('dataSelectDelete');
    listarComboBoxTrecho(dataSelectDelete);
    const dataSelectUpdate = document.getElementById('dataSelectUpdate');
    listarComboBoxTrecho(dataSelectUpdate);

    // Chama a função para listar aeroportos na caixa de seleção 'aeroSaida'
    var newaeroSaida = document.getElementById('newaeroSaida');
    listarComboBox(newaeroSaida,fetchListarAero);

    // Chama a função para listar aeroportos na caixa de seleção 'aeroChegada'
    var newaeroChegada = document.getElementById('newaeroChegada');
    listarComboBox(newaeroChegada,fetchListarAero);


   /* newaeroSaida.addEventListener("change",function(){
        var selectedIndex1 = newaeroSaida.selectedIndex; // Índice da opção selecionada
        var selectedOption1 = newaeroSaida.options[selectedIndex1]; // Opção selecionada
        var selectedValue1 = selectedOption1.value; // Valor da opção selecionada
        console.log('Aero1:', selectedValue1);
    });

    newaeroChegada.addEventListener("change",function(){
        var selectedIndex = newaeroChegada.selectedIndex; // Índice da opção selecionada
        var selectedOption = newaeroChegada.options[selectedIndex]; // Opção selecionada
        var selectedValue = selectedOption.value; // Valor da opção selecionada
        console.log('Aero2:', selectedValue);
    });*/
});