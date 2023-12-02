
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
function createVooCard( origem, destino, data, preco, idVoo) {
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
        <div class="voo-details">
            <div><p>Origem</p><h2>${origem}</h2></div>
            <div><img src="../../../src/assets/img/aviaoIcon.png"></div>
            <div><p>Destino</p><h2>${destino}</h2></div>
            <div><h2>${data}</h2></div>
            <div class="voo-preco">R$${preco}</div>
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
function BuscarVoo(aeroSaida, aeroChegada, dataVoo){
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
            const aeroSaida = item[6];
            const aeroChegada = item[7];

            // Exemplo de uso da função
            createVooCard(aeroSaida, aeroChegada, dataV, preco, idVoo);
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

//exemplos para adicionar voos
/*const listaDeVoos = [
    { origem: 'Cidade A', destino: 'Cidade B', data: '2023-12-01', preco: 500, idVoo: 1 },
    { origem: 'Cidade C', destino: 'Cidade D', data: '2023-12-02', preco: 600, idVoo: 2 },
    { origem: 'Cidade E', destino: 'Cidade F', data: '2023-12-03', preco: 700, idVoo: 3 },
    { origem: 'Cidade G', destino: 'Cidade H', data: '2023-12-04', preco: 800, idVoo: 4 }
];
  // Função para adicionar os voos à página
function adicionarVoos() {
    // Loop através da lista de voos e chama a função createVooCard para cada um
    for (const voo of listaDeVoos) {
        createVooCard(voo.origem, voo.destino, voo.data, voo.preco, voo.idVoo);
    }
}*/

//chamada das funcoes no carregamento da pagina
document.addEventListener("DOMContentLoaded", function() {

    // armazenas as comboBox nas variaveis e chamar a funcao para listá-las
    const dataSelectSaida = document.getElementById('aeroSaidaSelect');
    listarComboBox(dataSelectSaida, fetchListarAero);

    const dataSelectChegada = document.getElementById('aeroChegadaSelect');
    listarComboBox(dataSelectChegada, fetchListarAero);


    //armazenar aeroportos escolhidos
    var selectbox1 = document.getElementById("aeroSaidaSelect"); // caixa de seleção com id "pagamentoSelect"
    selectbox1.addEventListener("change",function(){
        var selectedIndex1 = selectbox1.selectedIndex; // Índice da opção selecionada
        var selectedOption1 = selectbox1.options[selectedIndex1]; // Opção selecionada
        var selectedValue1 = selectedOption1.value; // Valor da opção selecionada
        console.log('Aero1:', selectedValue1);
        sessionStorage.setItem('aeroSaida', selectedValue1); //objeto js para armazenar informaçoes durante uma sessão
    });

    var selectbox2 = document.getElementById("aeroChegadaSelect"); // caixa de seleção com id "pagamentoSelect"
        selectbox2.addEventListener("change",function(){
        var selectedIndex2 = selectbox2.selectedIndex; // Índice da opção selecionada
        var selectedOption2 = selectbox2.options[selectedIndex2]; // Opção selecionada
        var selectedValue2 = selectedOption2.value; // Valor da opção selecionada
        console.log('Aero2:', selectedValue2);
        sessionStorage.setItem('aeroChegada', selectedValue2); 
    });

    //armazenar data escolhida
    Data.addEventListener("change",function(){
        var dataVoo = document.getElementById("Data").value;
        console.log("data: ",dataVoo);
        sessionStorage.setItem('dataVoo', dataVoo); 
    });
   /*
    var search = document.getElementById("search");
        
    search.addEventListener("click", function(){
        //console.log(selectedValue1, selectedValue2, dataVoo);
        window.location.href = `buscaVoo.html`;
    })*/
});
