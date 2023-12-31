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

/*ALTERAR STATUS*/
function fetchAlterar(body) {
const requestOptions = {
    method: 'POST', headers: { 'Content-Type': "application/json" }, body: JSON.stringify(body)
};
return fetch('http://localhost:3000/updateAssento', requestOptions).then(T => T.json())
}

function UpdateStatus(idAssento, status) {
    fetchAlterar({
        idAssento: idAssento,
        status: status
    })
        .then(customResponse => {
            if (customResponse.status === "SUCCESS") {
                MessageStatus("status do assento alterado... ", false);
            } else {MessageStatus("Erro ao alterar assento...: " + customResponse.message, true);
            console.log(customResponse.message);
        }
    })
    .catch((e) => {
        MessageStatus("Erro técnico ao listar... Contate o suporte.", true);
        console.log("Falha grave ao listar." + e)
    });
}

/* LISTAR */
function fetchListarAssento(body){
    console.log("cheguei no aqui")
    const requestOptions = {
        method: 'POST', headers: {'Content-Type' : "application/json"}, body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/selectAssentoByVoo', requestOptions).then(T => T.json())
}

// variavel para guardar quantidade de assentos selecionados 
let selecionou = 0;
// Variavel para guardar o valor do id selecionado
let idAssento = "";
// Função para listar assentos de um voo específico
function ListarAssentos(idVoo) {
const dataBody = document.getElementById('dataBody');

// Chama a função de requisição para listar os assentos do voo com o ID fornecido
fetchListarAssento({
idVoo: idVoo
})
.then(customResponse => {
    if (customResponse.status === "SUCCESS") {
        // Limpa qualquer conteúdo anterior da tabela
        dataBody.innerHTML = '';

        //payload que recebe de resposta da req, contendo um array de arrays
        let payload = customResponse.payload;
        console.log(payload);
        let tam = payload.length;
        console.log(tam);

        let estilobtn = "assentoLivre";
        
        // Loop para preencher a tabela com os assentos em pares
        for (let i = 0; i < tam - 1; i += 2) {
            let item = customResponse.payload[i];
            let item2 = customResponse.payload[i + 1];

            //assento "A"
            const idassento1 = item[0];
            const codigo1 = item[2];
            let status1 = item[3];

            //assento "B"
            const idassento2 = item2[0];
            const codigo2 = item2[2];
            let status2 = item2[3];

            // Criação de botões para os assentos, funcao js
            const button1 = document.createElement('button');
            button1.textContent = codigo1;
            button1.setAttribute('idAssento', idassento1);



            const button2 = document.createElement('button');
            button2.textContent = codigo2;
            button2.setAttribute('idAssento', idassento2);


            // verificar se o status do assento está como "DISPONIVEL"
            //definir estilo css para o botao, atribuindo a classe
            if (status1 === "DISPONIVEL"){
                estilobtn = "assentoLivre";
            } else {
                estilobtn = "assentoOcupado";
            }
            button1.className = estilobtn;
            
            if (status2 === "DISPONIVEL"){
                estilobtn = "assentoLivre";
            } else {
                estilobtn = "assentoOcupado";
            }
            button2.className = estilobtn;
            
            // Adiciona os botões ao corpo da tabe;a
            dataBody.appendChild(button1);
            dataBody.appendChild(button2);
            dataBody.appendChild(document.createElement('br')); // Pula uma linha entre os pares de botões


            // CLIQUE NO BOTAO
            button1.addEventListener('click', function() {
                
                // Lógica para lidar com o clique do botão
                console.log(`Assento selecionado com ID: ${idassento1} ${status1}`);
                if (status1 === "DISPONIVEL"){
                    status1 = "INDISPONIVEL";

                    console.log(`estou indisponivel - Status: ${status1}` )

                    // mudar estilo do botao
                    button1.classList.remove('assentoLivre'); // Remove a classe anterior
                    button1.classList.add('assentoEscolhido'); // adiciona classe

                    selecionou = selecionou + 1
                    console.log(`selecionou: ${selecionou}`);

                    

                } else {
                    // Se o status for INDISPONIVEL, altera para DISPONIVEL
                        status1 = "DISPONIVEL";
                        //UpdateStatus(idassento1, status1);

                        console.log(`Estou disponível - Status: ${status1}`);
                        // mudar estilo do botao
                        button1.classList.remove('assentoEscolhido'); // Remove a classe anterior
                        button1.classList.add('assentoLivre'); // adiciona classe 

                        if (selecionou > 0){
                            selecionou -= 1;
                            console.log(`selecionou: ${selecionou}`);
                        }

                }
                idAssento = idassento1;
                console.log(`id assento guardado: ${idAssento}`);
            });

            button2.addEventListener('click', function() {
                // Lógica para lidar com o clique do botão
                console.log(`Assento selecionado com ID: ${idassento2} ${status2}`);
                if (status2 === "DISPONIVEL"){
                    status2 = "INDISPONIVEL";
                    //UpdateStatus(idassento1, status1);                           
                    console.log(`estou indisponivel - Status: ${status2}` )

                    // mudar estilo do botao
                    button2.classList.remove('assentoLivre'); // Remove a classe anterior
                    button2.classList.add('assentoEscolhido');

                    selecionou = selecionou + 1
                    console.log(`selecionou: ${selecionou}`);
                    
                    

                } else {
                    // Se o status for INDISPONIVEL, altera para DISPONIVEL
                        status2 = "DISPONIVEL";
                        //UpdateStatus(idassento1, status1);

                        console.log(`Estou disponível - Status: ${status2}`);
                        // mudar estilo do botao
                        button2.classList.remove('assentoEscolhido'); // Remove a classe anterior
                        button2.classList.add('assentoLivre');

                        if (selecionou > 0){
                            selecionou -= 1;
                            console.log(`selecionou: ${selecionou}`);
                        }
                }   
                idAssento = idassento2;
                console.log(`id assento guardado: ${idAssento}`);
            });
        }
    } else {
        MessageStatus("Erro ao listar assentos: " + customResponse.message, true);
        console.log(customResponse.message);
    }
})
.catch((e) => {
    MessageStatus("Erro técnico ao listar assentos. Contate o suporte.", true);
    console.log("Falha grave ao listar assentos." + e);
});
}

btnConfirmar.addEventListener('click', function() {
console.log(`selecionou: ${selecionou}`);
console.log(`id assento guardado: ${idAssento}`);
if(selecionou != 1){
if(selecionou === 0){
    MessageStatus("Por favor, selecione um assento antes de confirmar.", true);
}else{
    MessageStatus("Por favor, selecione apenas um assento antes de confirmar.", true);
} 
}else{
//variavel para consultar se há escolha de voo de volta, retorna true ou false
volta = sessionStorage.getItem('volta');

//obtem id do voo passado pela URL
const idVoo = obterParametroUrl('idVoo');

if (volta === "true"){

// guarda o id do assento selecionado
sessionStorage.setItem('idAssento1', idAssento);

// guarda o id do primeiro voo selecionado
sessionStorage.setItem('idVoo1', idVoo); 
sessionStorage.setItem('volta','voltou');
window.location.href = `buscaVoo.html`;

} else {
    sessionStorage.setItem('idAssento', idAssento);

    // guarda o id do voo selecionado
    sessionStorage.setItem('idVoo', idVoo);
    
    // Redirecionar para a prox página com o ID do assento e do Voo na URL
    window.location.href = `../../../modules/portal/4_informacoes/informacoes.html?idAssento=${idAssento}&idVoo=${idVoo}`;           
} 

}
});

// funcao para pegar o parametro idVoo passado na url
function obterParametroUrl(nome) {
const urlParams = new URLSearchParams(window.location.search);
return urlParams.get(nome);
}

// CHAMADA DAS FUNCOES no carregamento da página
document.addEventListener("DOMContentLoaded", function() {

// Obtém o ID do voo da URL
const idVoo = obterParametroUrl('idVoo');

// Verifica se o ID do voo foi obtido com sucesso
if (idVoo !== null) {
console.log('ID do Voo:', idVoo);

// chama funcao de listar assentos do voo especifico após pegar seu id 
ListarAssentos(idVoo);
} else {
console.error('ID do Voo não encontrado na URL.');
}    
});