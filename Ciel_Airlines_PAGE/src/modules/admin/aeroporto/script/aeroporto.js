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

function fetchListar(body){
    const requestOptions = {
        method: 'GET', headers: {'Content-Type' : "application/json"}, body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/selectAeroporto', requestOptions).then(T => T.json())
}

/*
function listarCidades(){
    const aeroSaida = document.getElementById('aeroSaida');

    fetchListar()
        .then(customResponse => {
        if(customResponse.status === "SUCCESS"){
            IDCidade.innerHTML = '';

            customResponse.payload.forEach(item => {
                const idcidade = item[0];
                const nome = item[1];

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
    fetchListar()
    .then(customResponse => {
    if(customResponse.status === "SUCCESS"){
        
        // Limpa qualquer conteúdo anterior da tabela
        dataBody.innerHTML = '';

        // Preenche a tabela com os dados da resposta
        customResponse.payload.forEach(item => {
            const idaero = item[0];
            const idcidade = item[1];
            const nome = item[2]
            const sigla = item[3]

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
        method: 'POST', headers: {'Content-Type' : "application/json"}, body: JSON.stringify(body)
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


function inserirAeroporto(IdCidade){
    if(!preencheuNomeAeroporto()){
        MessageStatus("Preencha o NOME do aeroporto!", true);
        return
    }
    if(!selecionouIDCidade()){
        MessageStatus("Selecione o ID da cidade!", true);
        return
    }
    if(!preencheuSigla()){
        MessageStatus("Preencha a SIGLA do aeroporto!", true);
        return
    }

    //const IDCidade = idCidade;
    const NomeAeroporto = document.getElementById("nomeAeroporto").value;
    const SiglaAeroporto = document.getElementById("siglaAeroporto").value;

    fetchInserir({
        idCidade: IdCidade,
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

function ListarAeroportoComboBox(){
    const dataSelect = document.getElementById('dataSelectDelete');
    fetchListar()
        .then(customResponse => {
        if(customResponse.status === "SUCCESS"){
            dataSelect.innerHTML = '';

            customResponse.payload.forEach(item => {
                const idaeroporto = item[0];
                const nome = item[2]; //colunas db

                const option = document.createElement('option');
                option.value = idaeroporto; // Valor da opção
                option.text = `${nome}`; // Texto visível

                dataSelect.appendChild(option);
            });
        }else{
            MessageStatus("Erro ao listar aeroporto...: " + customResponse.message, true);
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
        idAeroporto: selectedValue, 
    })
        .then(customResponse => {
        if(customResponse.status === "SUCCESS"){
            MessageStatus("Aeroporto excluido... ", false);
        }else{
            MessageStatus("Erro ao listar aeroporto...: " + customResponse.message, true);
            console.log(customResponse.message);
        }
        })
        .catch((e)=>{
            MessageStatus("Erro técnico ao listar... Contate o suporte.", true);
            console.log("Falha grave ao listar." + e)
        });
}

document.addEventListener("DOMContentLoaded", function() {
    ListarAeroporto();

    listarCidades();

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

    //excluir
    const button = document.getElementById("btnExcluir");
    var selectElement = document.getElementById("dataSelectDelete");

    if (button) {
        button.addEventListener('click', function() {
            var selectedIndex = selectElement.selectedIndex; // Índice da opção selecionada
            var selectedOption = selectElement.options[selectedIndex]; // Opção selecionada
            var selectedValue = selectedOption.value; 
    
            excluir(selectedValue);
        });
    }
});
