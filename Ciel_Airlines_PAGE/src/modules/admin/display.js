/*função para alterar a visibilidade de uma seção dentro de um bloco*/
function sectionView(sectionOn, sectionsOff ){

    /*para cada seção de invisibilidade desejada,
    caso diferentes da seção de visibilidade, mudar o display para none*/
    sectionsOff.forEach(function(sectionsOff){
        if(sectionsOff!== sectionOn){
            sectionsOff.style.display = 'none';
        }
    });
    /* caso o display da section for none atribui valor block*/
    if(window.getComputedStyle(sectionOn).display === 'none') {
        sectionOn.style.display = 'block';
    } else {
        sectionOn.style.display = 'none';
    }
}

/*atribuindo valores as variaveis */
//cadastrar
var btnCadastrar = document.querySelector('#btn-s-cadastrar');
var containerCadastrar = document.querySelector('.sectionCadastrar');
//excluir
var btnExcluir = document.querySelector('#btn-s-excluir');
var containerExcluir = document.querySelector('.sectionExcluir');
//escolher id alterar
var containerAlterar = document.querySelector('.sectionAlterar');
var btnAlterar = document.querySelector('#btn-s-alterar');
//alterar info
var btnAlterarInfo = document.querySelector('#btnConfirmarAltInfo');
var containerAltInfo = document.querySelector('#AlterarInfo');

btnCadastrar.addEventListener('click', function() {
    sectionView(containerCadastrar, [containerAlterar, containerAltInfo, containerExcluir])
});
btnExcluir.addEventListener('click', function() {
    sectionView(containerExcluir, [containerCadastrar, containerAlterar])
});
btnAlterar.addEventListener('click', function() {
    sectionView(containerAlterar, [containerCadastrar, containerExcluir])
});
btnAlterarInfo.addEventListener('click', function() {
    sectionView(containerAltInfo, [containerCadastrar, containerExcluir])
});


document.addEventListener("DOMContentLoaded", function () {
    // Adiciona um ouvinte de evento para o botão
    const btnReload = document.getElementById("btnReload");
    if (btnReload) {
        btnReload.addEventListener("click", function () {
            // Recarrega a página
            location.reload();
        });
    }
});


//Funcao geral para listar as opções com os dados da tabela dentro de uma caixa de selecao
function listarComboBox(element, fetchFunction) {
    fetchFunction()
        .then(customResponse => {
            if (customResponse.status === "SUCCESS") {
                element.innerHTML = '';

                customResponse.payload.forEach(item => {
                    const id = item[0];
                    const nome = item[1];

                    const option = document.createElement('option');
                    option.value = id; // Valor da opção
                    option.text = `${nome}`; // Texto visível

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

//Funcao geral para listar as opções com o id da linha dentro de uma caixa de selecao
function listarComboBoxporID(element, fetchFunction) {
    fetchFunction()
        .then(customResponse => {
            if (customResponse.status === "SUCCESS") {
                element.innerHTML = '';

                customResponse.payload.forEach(item => {
                    const id = item[0];
                    const nome = item[1];

                    const option = document.createElement('option');
                    option.value = id; // Valor da opção
                    option.text = `${id}`; // Texto visível

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