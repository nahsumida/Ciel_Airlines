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

  function fetchListarVendabyID(body) {
    console.log("cheguei no fetch")
    const requestOptions = {
          method: 'POST', headers: { 'Content-Type': "application/json" }, body: JSON.stringify(body)
    };
      return fetch('http://localhost:3000/selectVendaByAssento', requestOptions).then(T => T.json())
}
    

  function ListarVenda(idAssento){
    fetchListarVendabyID({
        idAssento: idAssento,
    })
    .then(customResponse => {
    if(customResponse.status === "SUCCESS"){
        console.log("cheguei na funcao");
        // Preenche a tabela com os dados da resposta
        customResponse.payload.forEach(item => {
            const idVenda = item[0];
            const nome = item[1];
            //const horaSaida = item[2];
            const assento = item[3];
            //const preco = item[4];
            const dataVoo = item[5];
            const numVoo = item[6];
            const aeroSaida = item[7];
            const aeroChegada = item[8];

            // Exemplo de uso da função
            createTicket(nome, assento, dataVoo,numVoo,aeroSaida,aeroChegada);
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

//funcao para formatar data vinda do banco para o padrao dd/mm/yyyy
function formatarData(data) {
    const dataObj = new Date(data);
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
}
  
function createTicket(nome, assento, dataVoo, numVoo, aeroSaida, aeroChegada) {
    const ticketContainer = document.getElementById('ticket');
  
    // Criar o elemento do card do bilhete
    const ticketCard = document.createElement('div');
    ticketCard.className = 'ticket';
  
    // Cabeçalho do bilhete
    const header = document.createElement('div');
    header.className = 'ticket-header';
    header.innerHTML = `<h2>${nome}</h2><p>Assento: ${assento}</p>`;
    ticketCard.appendChild(header);
  
    // Detalhes do bilhete
    const details = document.createElement('div');
    details.className = 'ticket-details';
    details.innerHTML = `
      <p>Data do Voo: ${formatarData(dataVoo)}</p>
      <p>Número do Voo: ${numVoo}</p>
      <div class="row">
        <div class="col" id="saida"> 
        <p>Partida:</p> <p> ${aeroSaida}</p></div>
        <div class="col" id="chegada"> 
        <p>Chegada:</p> <p> ${aeroChegada}</p></div>
      </div>  
    `;
    ticketCard.appendChild(details);
    
    // Adicionar o card do bilhete ao container
    ticketContainer.appendChild(ticketCard);
}

  document.addEventListener("DOMContentLoaded", function() {
      
    // verificação se a compra tem voo de volta
    // caso tenha, faz uma inserção na tabela de venda da primeira passagem e segue para a segunda
    const volta = sessionStorage.getItem('volta');
    if(volta !== "false"){

      // pega valores do assento da primeira passagem
      idAssento1 = sessionStorage.getItem('idAssento1');
      
      ListarVenda(idAssento1);
    } 

    // pega valores do assento e do voo da passagem
    idAssento = sessionStorage.getItem('idAssento');
    ListarVenda(idAssento);

    });
