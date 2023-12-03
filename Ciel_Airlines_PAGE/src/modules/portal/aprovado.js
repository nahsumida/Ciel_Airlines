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
      return fetch('http://localhost:3000//selectVendaByAssento', requestOptions).then(T => T.json())
  }

  function ListarVenda(idAssento){
    fetchListarVendabyID({
        "idAssento": idAssento
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
  

