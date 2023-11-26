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

function fetchListarAero(body){
    const requestOptions = {
        method: 'GET', headers: {'Content-Type' : "application/json"}, body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/selectAeroporto', requestOptions).then(T => T.json())
}
function fetchListarCidade(body) {
    const requestOptions = {
        method: 'GET', headers: { 'Content-Type': "application/json" }, body: JSON.stringify(body)
    };
    return fetch('http://localhost:3000/selectCidade', requestOptions).then(T => T.json())
}

/*
function listarCidades(){
    fetchListarCidade()
        .then(customResponse => {
        if(customResponse.status === "SUCCESS"){
            IDCidade.innerHTML = '';

            customResponse.payload.forEach(item => {
                const idcidade = item[2];
                const nome = item[3];

                const option = document.createElement('option');
                option.value = idcidade; // Valor da opção
                option.text = `${nome}`; // Texto visível

                IDCidade.appendChild(option);
            });
        }else{
            MessageStatus("Erro ao listar cidade...: " + customResponse.message, true);
            console.log(customResponse.message);
        }
        })
        .catch((e)=>{
            MessageStatus("Erro técnico ao listar... Contate o suporte.", true);
            console.log("Falha grave ao listar." + e)
        });
}*/

function ListarAeroporto(){
    const dataBody = document.getElementById('dataBody');
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


//INSERIR

function fetchInserir(body){
    const requestOptions = {
        method: 'PUT', headers: {'Content-Type' : "application/json"}, body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/insertAeroporto', requestOptions).then(T => T.json())
}

//validações campo vazio
function selecionouIDCidade(){
    let resultado = false;

    const valIDCidadeSelecionado = document.getElementById('IDCidade').value;
    // para obter o texto selecionado
    var text = document.getElementById('IDCidade').options[document.getElementById('IDCidade').selectedIndex].text;
    if(valIDCidadeSelecionado.length > 0){
        resultado = true;
    }
    return resultado;
}

function preencheuNomeAeroporto(){
    let resultado = false;

    const NomeSelecionado = document.getElementById('nomeAeroporto').value;
    if(NomeSelecionado.length > 0){
        resultado = true;
    }
    return resultado;
}

function preencheuSigla(){
    let resultado = false;

    const IDAeroSelecionado = document.getElementById('siglaAeroporto').value;
    if(IDAeroSelecionado.length > 0){
        resultado = true;
    }
    return resultado;
}


function inserirAeroporto(idCidade){
    console.log("id cidaadeeee " + idCidade)
    if(!preencheuNomeAeroporto()){
        MessageStatus("Preencha o NOME do aeroporto!", true);
        return
    }
    /*if(!selecionouIDCidade()){
        MessageStatus("Selecione o ID da cidade!", true);
        return
    }*/
    if(!preencheuSigla()){
        MessageStatus("Preencha a SIGLA do aeroporto!", true);
        return
    }

    //const IDCidade = idCidade;
    const NomeAeroporto = document.getElementById("nomeAeroporto").value;
    const SiglaAeroporto = document.getElementById("siglaAeroporto").value;

    fetchInserir({
        idCidade: idCidade,
        nomeAeroporto: NomeAeroporto,
        sigla: SiglaAeroporto
    })
        .then(customResponse => {
        if(customResponse.status === "SUCCESS"){
            MessageStatus("Aeroporto cadastrado... ", false);
        }else{
            MessageStatus("Erro ao cadastrar aeroporto...: " + customResponse.message, true);
            console.log(customResponse.message);
        }
        })
        .catch((e)=>{
            MessageStatus("Erro técnico ao cadastrar... Contate o suporte.", true);
            console.log("Falha grave ao cadastrar." + e)
        });
}





//EXCLUIR

//Funcao para lista as opções com os dados da tabela dentro de uma caixa de selecao
function ListarAeroportoComboBox(element) {
    fetchListar()
        .then(customResponse => {
            if (customResponse.status === "SUCCESS") {
                element.innerHTML = '';

                customResponse.payload.forEach(item => {
                    const idAeroporto = item[0];
                    const nomeAeroporto = item[1];

                    const option = document.createElement('option');
                    option.value = idAeroporto; // Valor da opção
                    option.text = `${nomeAeroporto}`; // Texto visível

                    element.appendChild(option);
                });
            } else {
                MessageStatus("Erro ao listar Trecho...: " + customResponse.message, true);
                console.log(customResponse.message);
            }
        })
        .catch((e) => {
            MessageStatus("Erro técnico ao listar... Contate o suporte.", true);
            console.log("Falha grave ao listar." + e);
        });
}

//Funcao envia request para o endpoint para deletar Cidades
function fetchExcluir(body) {
    const requestOptions = {
        method: 'DELETE', headers: { 'Content-Type': "application/json" }, body: JSON.stringify(body)
    };
    return fetch('http://localhost:3000/deleteAeroporto', requestOptions).then(T => T.json())
}
function Excluir() {
    var selectElementDelete = document.getElementById("dataSelectDelete"); //caixa de select
    var selectedIndex = selectElementDelete.selectedIndex; // Índice da opção selecionada
    var selectedOption = selectElementDelete.options[selectedIndex]; // Opção selecionada
    var selectedValue = selectedOption.value; //valor da opcao a ser excluída


    fetchExcluir({
        idAeroporto: selectedValue,
    })
        .then(customResponse => {
            if (customResponse.status === "SUCCESS") {
                MessageStatus("Aeroporto excluido... ", false);
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

document.addEventListener("DOMContentLoaded", function() {
    //chamada da funcao para listar na tabela
    ListarAeroporto();

    // chama a funcao para listar cidades dentro da caixa select de ID Cidade
    const dataSelectCidade = document.getElementById('IDCidade');
    listarComboBox( dataSelectCidade, fetchListarCidade)

    // chama a funcao para listar aeroportos dentro da caixa select delete e update
    const dataSelectDelete = document.getElementById('dataSelectDelete');
    listarComboBox(dataSelectDelete, fetchListarAero);
    const dataSelectUpdate = document.getElementById('dataSelectUpdate');
    listarComboBox(dataSelectUpdate, fetchListarAero);
    

    //cadastrar
    const btnCadastrar = document.getElementById("btnCadastrar");
    var IDCidade = document.getElementById("IDCidade");

    if (btnCadastrar) {
        btnCadastrar.addEventListener('click', function() {
            var selectedIndex = IDCidade.selectedIndex; // Índice da opção selecionada
            var selectedOption = IDCidade.options[selectedIndex]; // Opção selecionada
            var selectedID = selectedOption.value; 
            console.log(selectedID)
            inserirAeroporto(selectedID);
        });
    }

});