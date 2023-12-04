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
/*
LISTAR
*/
//Funcao envia request para o endpoint
function fetchListarAeronave(body){
    console.log("cheguei no fim")
    const requestOptions = {
        method: 'GET', headers: {'Content-Type' : "application/json"}, body: JSON.stringify(body)
    };

return fetch('http://localhost:3000/selectAeronave', requestOptions).then(T => T.json())
}
function ListarAeronave() {
    console.log("carreguei de novo")
    const dataBody = document.getElementById('dataBody');
    fetchListarAeronave()
        .then(customResponse => {
            console.log("Resposta da API:", customResponse);

            if (customResponse.status === "SUCCESS") {
                // Limpa qualquer conteúdo anterior da tabela
                dataBody.innerHTML = '';

                // Preenche a tabela com os dados da resposta
                customResponse.payload.forEach(item => {
                    console.log(item)
                    const id  = item[0];
                    const companhiaAerea = item[1];
                    const  modelo = item[2];
                    const ano = item[3];
                    const fabricante = item[4];
                    const numIdentificacao  = item[5];

                    const row = dataBody.insertRow();
                    const cell1 = row.insertCell(0);
                    const cell2 = row.insertCell(1);
                    const cell3 = row.insertCell(2);
                    const cell4 = row.insertCell(3);
                    const cell5 = row.insertCell(4);
                    const cell6 = row.insertCell(5);

                    cell1.textContent = id;
                    cell2.textContent = modelo;
                    cell3.textContent = numIdentificacao;
                    cell4.textContent = fabricante;
                    cell5.textContent = companhiaAerea;
                    cell6.textContent = ano;
                });
            } else {
                MessageStatus("Erro ao listar aeronaves: " + customResponse.message, true);
                console.log(customResponse.message);
            }
        })
        .catch((e) => {
            MessageStatus("Erro técnico ao listar aeronaves. Contate o suporte.", true);
            console.error("Falha grave ao listar aeronaves.", e);
        });
}



// INSERIR
function fetchListarCompanhia(body){
    const requestOptions = {
        method: 'GET', headers: {'Content-Type' : "application/json"}, body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/selectCompanhiaAerea', requestOptions).then(T => T.json())
}

function fetchInserir(body){
    const requestOptions = {
        method: 'PUT', headers: {'Content-Type' : "application/json"}, body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/insertAeronave', requestOptions).then(T => T.json())
} 

function preencheuModelo(){
    let resultado = false;

    const modeloSelecionado = document.getElementById('Modelo').value;
    if(modeloSelecionado.length > 0){
        resultado = true;
    }
    return resultado;
}

function preencheuNumID(){
    let resultado = false;

    const NumIDpreenchido = document.getElementById('NumIdentificacao').value;
    if(NumIDpreenchido.length >0){
        resultado = true;
    }
    return resultado;
}

function anoValido(){
    let resultado = false;

    var strAno = document.getElementById('anoFabricacao').value;

    const ano = parseInt(strAno);
    console.log("Ano : " + ano.toString());
    if(ano >= 1990 && ano <= 2026){
        resultado = true;
    }
    return resultado;
}

function preencheuFab(){
    let resultado = false;

    const valfabricanteSelecionado = document.getElementById('fabricante').value;
    
    if(valfabricanteSelecionado > 0){
        resultado = true;
    }
    return resultado;
}

function totalAssentosValido(){
    let resultado = false;
    const strAssento = document.getElementById('numAssentos').value;
    const assentos = parseInt(strAssento);
    if(assentos > 0){
        resultado = true;
    }
    return resultado;
}

function selecionouCompanhia(){
    let resultado = false;

    const valCompanhiaSelecionada = document.getElementById('CompanhiaAerea').value;
    if(valCompanhiaSelecionada.length > 0){
        resultado = true;
    }
    return resultado;
}

function inserirAeronave(CompanhiaAerea){
    if(!preencheuModelo()){
        MessageStatus("Preencha modelo!", true);
        return;
    }
    if(!preencheuNumID()){
        MessageStatus("Preencha o Numero de Identificação!", true);
        return;
    }
    if(!anoValido()){
        MessageStatus("Ano inválido!", true);
        return;
    }
    if(!preencheuFab()){
        MessageStatus("Selecione o Fabricante!", true);
        return;
    }
    if(!totalAssentosValido()){
        MessageStatus("Preencha  o total de assentos.", true);
        return;
    }
    if(!selecionouCompanhia()){
        MessageStatus("Selecione uma Companhia Aérea!", true);
        return;
    }
    
    
    const Modelo = document.getElementById("Modelo").value;
    const NumIdentificacao = document.getElementById("NumIdentificacao").value;
    var text = document.getElementById('fabricante').options[document.getElementById('fabricante').selectedIndex].text;
    const anoFabricacao = document.getElementById("anoFabricacao").value;
    //const Total_assentos = document.getElementById("Total_assentos").value;
    CompanhiaAerea = document.getElementById("CompanhiaAerea").value;

    fetchInserir({
        modelo: Modelo, 
        numIdentificacao: NumIdentificacao ,
        fabricante: text,
        anoFabricacao: anoFabricacao,
        companhiaAerea : CompanhiaAerea,
        //totalAssento: Total_assentos
        })
        .then(customResponse => {
        if(customResponse.status === "SUCCESS"){
            MessageStatus("Aeronave cadastrada... ", false);
        }else{
            MessageStatus("Erro ao cadastrar aeronave...: " + customResponse.message, true);
            console.log(customResponse.message);
        }
        })
        .catch((e)=>{
            MessageStatus("Erro técnico ao cadastrar... Contate o suporte.", true);
            console.log("Falha grave ao cadastrar." + e)
        });
}


/*CHAMADA DAS FUNÇÕES NO CARREGAMENTO DA PAGINA*/
document.addEventListener("DOMContentLoaded", function () {
    console.log("eu carreguei")
    ListarAeronave();

    const CompanhiaAerea = document.getElementById('CompanhiaAerea');
    listarComboBox(CompanhiaAerea,fetchListarCompanhia);

    //alterar
    // chama a funcao para listar trechos dentro da caixa select delete e update
    const dataSelectDelete = document.getElementById('dataSelectDelete');
    listarComboBoxporID(dataSelectDelete,fetchListarAeronave)
    const dataSelectUpdate = document.getElementById('dataSelectUpdate');
    listarComboBoxporID(dataSelectUpdate,fetchListarAeronave)

});
