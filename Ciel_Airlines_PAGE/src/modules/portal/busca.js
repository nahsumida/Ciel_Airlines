  //chamada das funcoes no carregamento da pagina
  document.addEventListener("DOMContentLoaded", function() {

    // coleta valores e os atribui em variáveis
    var aeroSaida = sessionStorage.getItem('aeroSaida');
    var aeroChegada = sessionStorage.getItem('aeroChegada');
    var dataVoo = sessionStorage.getItem('dataVoo');
    var volta = sessionStorage.getItem('volta');
    
    // chama funcao de busca do voo de ida, preenchendo o card com as infos
    console.log("cheguei aqui")
    console.log(aeroSaida, aeroChegada, dataVoo, volta);
    BuscarVoo(aeroSaida, aeroChegada, dataVoo, "IDA");

    // caso o elemento volta seja verdadeiro, pega a data de volta armazenada
    // chama funcao de busca do voo (aeroporto destino e partida invertidos)
   if(volta !== "false"){
      idAssento1 = sessionStorage.getItem('idAssento1');
      console.log('id ASSENTO 1:', idAssento1);
      var dataVooVolta = sessionStorage.getItem('dataVooVolta');
      BuscarVoo(aeroChegada, aeroSaida, dataVooVolta, "VOLTA");
    }
  });