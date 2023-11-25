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


document.addEventListener('DOMContentLoaded', function () {
    ListarAeronave();
});