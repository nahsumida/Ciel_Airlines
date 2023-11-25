//Funcao para mostrar status de erro ou sucesso
function MessageStatus(msg, error) {
    var pStatus = document.getElementById("status");

    if (error === true) {
        pStatus.className = " statusError";
    }
    else {
        pStatus.className = 'statusSuccess';
    }
    pStatus.textContent = msg;
}

/*
LISTAR
*/

//Funcao envia request para o endpoint para listar Cidades
function fetchListar(body) {
    const requestOptions = {
        method: 'GET', headers: { 'Content-Type': "application/json" }, body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/selectCidade', requestOptions).then(T => T.json())
}


//Funcao para lista as opções com os dados da tabela dentro de uma caixa de selecao
function ListarCidadeComboBox() {
    const dataSelectDelete = document.getElementById('dataSelectDelete');
    const dataSelectUpdate = document.getElementById('dataSelectUpdate');

    fetchListar()
        .then(customResponse => {
            if (customResponse.status === "SUCCESS") {
                // Limpa qualquer conteúdo anterior da tabela
                dataSelectDelete.innerHTML = '';
                dataSelectUpdate.innerHTML = '';

                customResponse.payload.forEach(item => {
                    const idCidade = item[0];
                    const nome = item[1]; //colunas db

                    const option = document.createElement('option');
                    option.value = idCidade; // Valor da opção
                    option.text = `${nome}`; // Texto visível

                    dataSelectDelete.appendChild(option);
                    dataSelectUpdate.appendChild(option);

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

function ListarCidade() {
    const dataBody = document.getElementById('dataBody');
    fetchListar()
        .then(customResponse => {
            if (customResponse.status === "SUCCESS") {

                // Limpa qualquer conteúdo anterior da tabela
                dataBody.innerHTML = '';

                // Preenche a tabela com os dados da resposta
                customResponse.payload.forEach(item => {
                    const numero = item[0];
                    const texto = item[1];

                    const row = dataBody.insertRow();
                    const cell1 = row.insertCell(0);
                    const cell2 = row.insertCell(1);
                    cell1.textContent = numero;
                    cell2.textContent = texto;
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

/*
INSERIR
*/

//validações campo vazio
function preencheuID() {
    let resultado = false;

    const IDSelecionado = document.getElementById('IDCidade').value;
    if (IDSelecionado.length > 0) {
        resultado = true;
    }
    return resultado;
}

function preencheuNomeCidade() {
    let resultado = false;

    const NomeSelecionado = document.getElementById('nomeCidade').value;
    if (NomeSelecionado.length > 0) {
        resultado = true;
    }
    return resultado;
}

//Funcao envia request para o endpoint para listar Cidades
function fetchInserir(body) {
    const requestOptions = {
        method: 'PUT', headers: { 'Content-Type': "application/json" }, body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/insertCidade', requestOptions).then(T => T.json())
}

//Funcao que insere cidade digitada
function inserirCidade() {
    if (!preencheuNomeCidade()) {
        MessageStatus("Preencha o nome da cidade!", true);
        return
    }

    const nomeCidade = document.getElementById("nomeCidade").value;
    console.log(nomeCidade);

    fetchInserir({
        nomeCidade: nomeCidade
    })
        .then(customResponse => {
            if (customResponse.status === "SUCCESS") {
                MessageStatus("Cidade cadastrada... ", false);
            } else {
                MessageStatus("Erro ao cadastrar cidade...: " + customResponse.message, true);
                console.log(customResponse.message);
            }
        })
        .catch((e) => {
            MessageStatus("Erro técnico ao cadastrar... Contate o suporte.", true);
            console.log("Falha grave ao cadastrar." + e)
        });
}

/*
EXCLUIR
*/

//Funcao envia request para o endpoint para deletar Cidades
function fetchExcluir(body) {
    const requestOptions = {
        method: 'DELETE', headers: { 'Content-Type': "application/json" }, body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/deleteCidade', requestOptions).then(T => T.json())
}

//Funcao para excluir o valor selecionado
function Excluir(selectedValue) {
    fetchExcluir({
        idCidade: selectedValue,
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

/*
ALTERAR
*/
function fetchAlterar(body) {
    const requestOptions = {
        method: 'POST', headers: { 'Content-Type': "application/json" }, body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/updateCidade', requestOptions).then(T => T.json())
}
//Funcao para excluir o valor selecionado
function Alterar(selectedValue, alteredField) {
    fetchAlterar({
        idCidade: selectedValue,
        nomeCidade: alteredField
    })
        .then(customResponse => {
            if (customResponse.status === "SUCCESS") {
                MessageStatus("Cidade alterada... ", false);
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
    ListarCidade();
    ListarCidadeComboBox();
    const btnExcluir = document.getElementById("btnExcluir");
    var selectElementDelete = document.getElementById("dataSelectDelete");

    //caso o botao de excluir seja clicado -> exclui opcao desejada da tabela
    if (btnExcluir) {
        btnExcluir.addEventListener('click', function () {
            var selectedIndex = selectElementDelete.selectedIndex; // Índice da opção selecionada
            var selectedOption = selectElementDelete.options[selectedIndex]; // Opção selecionada
            var selectedValue = selectedOption.value;

            Excluir(selectedValue);
        });
    }

    const btnAlterar = document.getElementById("btnAlterar");
    var selectElementUpdate = document.getElementById("dataSelectUpdate");
    var newInput = document.getElementById("newnomeCidade");
    
    //caso o botao de excluir seja clicado -> exclui opcao desejada da tabela
    if (btnAlterar) {
        btnAlterar.addEventListener('click',function(){
            var selectedIndex = selectElementUpdate.selectedIndex; // Índice da opção selecionada
            var selectedOption = selectElementUpdate.options[selectedIndex];
            var selectedValue = selectedOption.value; // Opção selecionada

            const nomeCidade = newInput.value; // pega valor inserido pela pessoa
            console.log(nomeCidade); // verificar o valor

            Alterar(selectedValue, nomeCidade); // chama funcao para alterar 
        })
    }
});