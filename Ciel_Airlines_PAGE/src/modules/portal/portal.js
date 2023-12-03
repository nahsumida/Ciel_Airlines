
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

// funcao para obter parametros passados na url
function obterParametroUrl(nome) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nome);
  }

// Função chamada ao clicar no botão 'Selecionar'
function selecionarVoo(idVoo) {
    console.log(`voo selecionado com ID: ${idVoo}`); // verificacao no console
      // Redirecionar para a prox página com o ID do voo na URL
      window.location.href = `newMapa.html?idVoo=${idVoo}`;
  }

// Função para criar um card de voo dinamicamente
function createVooCard( origem, destino, data, preco, idVoo, titulo) {
    const VooContainer = document.getElementById('voo_container');

    // Criar o elemento do card de voo
    const VooCard = document.createElement('div');
    VooCard.className = 'voo-card';

    // Criar o botao de selecionar
    const btnSelecionar = document.createElement('button');
    btnSelecionar.textContent = 'Selecionar';

    // atribuir id do Voo para o botao selecionar, assim quando o usuario escolher
    //aquele card, passa o id do voo para listar os assentos na proxima página
    btnSelecionar.setAttribute('data-voo-id', idVoo);

     //adiciona o evento que reconhece o clique do botao 'Selecionar' e chama a funcao
     // selecionarVoo passando o id do botão como parametro
    btnSelecionar.addEventListener('click', function() {
      selecionarVoo(idVoo);   
    });
    // Preencher o card com informações
    VooCard.innerHTML = `
        <h5 style="text-align: left">${titulo}</h5>
        <div class="voo-details">
            <div class= "row">
                <div class="col"><p>Origem</p><h6>${origem}</h6></div>
                <div class="col" id="img"><img src="../../../src/assets/img/aviaoIcon.png"></div>
                <div class="col"><p>Destino</p><h6>${destino}</h6></div>
            </div>
            <div class="row" id="divide">
                <div class="col"><h6>${data}</h6></div>
                <div class ="col" id="voo-preco">R$${preco}</div>
            </div>
        </div>  
    `;
    //adiciona o botao 
    VooCard.appendChild(btnSelecionar);
    // Adicionar o card ao container de voos
    VooContainer.appendChild(VooCard);
}

//Funcao envia request para o endpoint para buscar voo com o id 
function fetchBuscarVoo(body){
    const requestOptions = {
        method: 'POST', headers: {'Content-Type' : "application/json"}, body: JSON.stringify(body)
    };
    console.log("cheguei no fetch");
    return fetch('http://localhost:3000/searchVoo', requestOptions).then(T => T.json())
}

//funcao para listar voo da busca
function BuscarVoo(aeroSaida, aeroChegada, dataVoo, titulo){
    fetchBuscarVoo({
        "dataVoo": dataVoo,
        "aeroSaida": aeroSaida,
        "aeroChegada": aeroChegada
    })
    .then(customResponse => {
    if(customResponse.status === "SUCCESS"){
        console.log("cheguei na funcao");
        // Preenche a tabela com os dados da resposta
        customResponse.payload.forEach(item => {
            const idVoo = item[0];
            const dataV = item[1];
            const horaSaida = item[2];
            const horaChegada = item[3];
            const preco = item[4];
            const aeronave = item[5];
            const aeroSaida = item[7];
            const aeroChegada = item[6];

            // Exemplo de uso da função
            createVooCard(aeroSaida, aeroChegada, dataV, preco, idVoo, titulo);
            //createVooCard(voo.origem, voo.destino, voo.data, voo.preco, voo.idVoo)
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


//chamada das funcoes no carregamento da pagina
document.addEventListener("DOMContentLoaded", function() {

    // armazenas as comboBox nas variaveis e chamar a funcao para listá-las
    const dataSelectSaida = document.getElementById('aeroSaidaSelect');
    listarComboBox(dataSelectSaida, fetchListarAero);

    const dataSelectChegada = document.getElementById('aeroChegadaSelect');
    listarComboBox(dataSelectChegada, fetchListarAero);


    //armazenar aeroportos escolhidos
    var selectbox1 = document.getElementById("aeroSaidaSelect"); // caixa de seleção com id "aeroSaidaSelect"
    selectbox1.addEventListener("change",function(){
        var selectedIndex1 = selectbox1.selectedIndex; // Índice da opção selecionada
        var selectedOption1 = selectbox1.options[selectedIndex1]; // Opção selecionada
        var selectedValue1 = selectedOption1.value; // Valor da opção selecionada
        console.log('Aero1:', selectedValue1);
        sessionStorage.setItem('aeroSaida', selectedValue1); //objeto js para armazenar informaçoes durante uma sessão
    });

    var selectbox2 = document.getElementById("aeroChegadaSelect"); // caixa de seleção com id "aeroChegadaSelect"
        selectbox2.addEventListener("change",function(){
        var selectedIndex2 = selectbox2.selectedIndex; // Índice da opção selecionada
        var selectedOption2 = selectbox2.options[selectedIndex2]; // Opção selecionada
        var selectedValue2 = selectedOption2.value; // Valor da opção selecionada
        console.log('Aero2:', selectedValue2);
        sessionStorage.setItem('aeroChegada', selectedValue2); 
    });

    //armazenar data de volta escolhida
    Data.addEventListener("change",function(){
        var dataVoo = document.getElementById("Data").value;
        console.log("data de ida: ",dataVoo);
        sessionStorage.setItem('dataVoo', dataVoo); 
    });

    let volta = false;
    console.log("tem volta:", volta);
    sessionStorage.setItem('volta',volta);
    //armazenar data escolhida
    if (DataVolta){
        volta = true;
        console.log("tem volta:", volta);
        DataVolta.addEventListener("change",function(){
            var dataVooVolta = document.getElementById("DataVolta").value;
            console.log("data de volta: ",dataVooVolta);
            sessionStorage.setItem('dataVooVolta', dataVooVolta); 
            sessionStorage.setItem('volta',volta);
        });
    } else {
        // dupla validaçao para o valor de "volta" ser armazenado "false"
        volta = false;
        console.log("tem volta:", volta);
        sessionStorage.setItem('volta',volta);
    }
});
