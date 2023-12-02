  //chamada das funcoes no carregamento da pagina
  document.addEventListener("DOMContentLoaded", function() {
    var aeroSaida = sessionStorage.getItem('aeroSaida');
    var aeroChegada = sessionStorage.getItem('aeroChegada');
    var dataVoo = sessionStorage.getItem('dataVoo');
    console.log("cheguei aqui")
    console.log(aeroSaida, aeroChegada, dataVoo);
    BuscarVoo(aeroSaida, aeroChegada, dataVoo);
  });