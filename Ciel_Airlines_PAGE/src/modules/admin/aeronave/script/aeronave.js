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
function ListarAeronave() {
    const dataBody = document.getElementById('dataBody');
    fetchListar()
        .then(customResponse => {
            console.log("Resposta da API:", customResponse);

            if (customResponse.status === "SUCCESS") {
                // Limpa qualquer conteúdo anterior da tabela
                dataBody.innerHTML = '';

                // Preenche a tabela com os dados da resposta
                customResponse.payload.forEach(item => {
                    const id = item.ID_AERONAVE;
                    const modelo = item.MODELO;
                    const numIdentificacao = item.NUM_IDENTIFICACAO;
                    const fabricante = item.FABRICANTE;
                    const ano = item.ANO_FABRICACAO;
                    const companhiaAerea = item.COMPANHIA_AEREA;

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
                    cell5.textContent = ano;
                    cell6.textContent = companhiaAerea;
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

function fetchInserir(body){
    const requestOptions = {
        method: 'POST', headers: {'Content-Type' : "application/json"}, body: JSON.stringify(body)
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
    const strAssento = document.getElementById('Total_assentos').value;
    const assentos = parseInt(strAssento);
    if(assentos >0){
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
    const CompanhiaAerea = document.getElementById("CompanhiaAerea").value;

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
    ListarAeronave();
});