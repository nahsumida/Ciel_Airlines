// Função para criar um card de voo dinamicamente
function createVooCard( origem, destino, data, preco, idVoo) {
    const VooContainer = document.getElementById('voo_container');

    // Criar o elemento do card de voo
    const VooCard = document.createElement('div');
    VooCard.className = 'voo-card';

    // Criar o botao de selecionar
    const btnSelecionar = document.createElement('button');
    btnSelecionar.textContent = 'Selecionar';

    // atribuir id do Voo para o botao
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
    
    // Adicionar o card ao container de voos
    VooCard.appendChild(btnSelecionar);

    VooContainer.appendChild(VooCard);
}

function fetchListarVoo(body){
    const requestOptions = {
        method: 'POST', headers: {'Content-Type' : "application/json"}, body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/searchVoo', requestOptions).then(T => T.json())
}

function ListarVoo(aeroSaida, aeroChegada, dataVoo){
    fetchListarVoo({
        "dataVoo": dataVoo,
        "aeroSaida": aeroSaida,
        "aeroChegada": aeroChegada
    })
    .then(customResponse => {
    if(customResponse.status === "SUCCESS"){
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
            createVooCard(aeroSaida, aeroChegada, dataV, preco, 1);
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

document.addEventListener("DOMContentLoaded", function() {
    console.log("cheguei aqui")
    const dataSelectSaida = document.getElementById('aeroSaidaSelect');
    listarComboBox(dataSelectSaida, fetchListarAero);

    const dataSelectChegada = document.getElementById('aeroChegadaSelect');
    listarComboBox(dataSelectChegada, fetchListarAero);

    //armazenar metodo de pagamento escolhido
    var selectbox1 = document.getElementById("aeroSaidaSelect"); // caixa de seleção com id "pagamentoSelect"
    selectbox.addEventListener("change",function(){
      var selectedIndex1 = selectbox1.selectedIndex; // Índice da opção selecionada
      var selectedOption1 = selectbox1.options[selectedIndex1]; // Opção selecionada
      var selectedValue1 = selectedOption1.value; // Valor da opção selecionada
    });
      var selectbox2 = document.getElementById("aeroChegadaSelect"); // caixa de seleção com id "pagamentoSelect"
        selectbox.addEventListener("change",function(){
      var selectedIndex2 = selectbox2.selectedIndex; // Índice da opção selecionada
      var selectedOption2 = selectbox2.options[selectedIndex2]; // Opção selecionada
      var selectedValue2 = selectedOption2.value; // Valor da opção selecionada
    });

    console.log(aeroSaida);
    console.log(aeroChegada);
    var dataVoo = document.getElementById("data");
    console.log(dataVoo)
    ListarVoo(selectedValue1, selectedValue2, dataVoo);
});