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

// Função para listar vendas na tabela HTML
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
            const data = item[5];
            const idvoo = item[6];
            const aeropart = item[7];
            const aerochegada = item[8];

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
            cell6.textContent = idvoo;
            cell7.textContent = data;
            cell8.textContent = aeropart;
            cell9.textContent = aerochegada;

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
// Função para listar opções de trecho em um elemento de caixa de seleção
//essa funcao é diferente das outras de listar comboBox, pois o id é o mesmo valor que aparecerá
// no texto visivel da caixa
function listarComboBoxbyId(element) {
    fetchListarVenda()
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
/*
EXCLUIR
*/
//Funcao envia request para o endpoint para deletar Cidades
function fetchExcluirVenda(body) {
    const requestOptions = {
        method: 'DELETE', headers: { 'Content-Type': "application/json" }, body: JSON.stringify(body)
    };
    return fetch('http://localhost:3000/deleteVenda', requestOptions).then(T => T.json())
}

//Funcao para excluir o valor selecionado
function Excluir() {
    var selectElementDelete = document.getElementById("dataSelectDelete"); //caixa de select
    var selectedIndex = selectElementDelete.selectedIndex; // Índice da opção selecionada
    var selectedOption = selectElementDelete.options[selectedIndex]; // Opção selecionada
    var selectedValue = selectedOption.value; //valor da opcao a ser excluída


    fetchExcluirVenda({
        idVenda: selectedValue,
    })
        .then(customResponse => {
            if (customResponse.status === "SUCCESS") {
                MessageStatus("Cidade excluida... ", false);
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
/*CHAMADA DAS FUNÇÕES NO CARREGAMENTO DA PAGINA*/
document.addEventListener("DOMContentLoaded", function () {
    console.log("eu carreguei")
    ListarVenda();
    listarComboBoxbyId(dataSelectDelete)
});