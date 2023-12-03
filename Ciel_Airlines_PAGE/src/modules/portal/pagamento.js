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

  // funcao que obtem os parametros passados na url
  function obterParametroUrl(nome) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nome);
  }
    
function fetchInserir(body) {
    console.log("cheguei no fetch")
    const requestOptions = {
          method: 'PUT', headers: { 'Content-Type': "application/json" }, body: JSON.stringify(body)
      };
      return fetch('http://localhost:3000/insertVenda', requestOptions).then(T => T.json())
  }

  function inserirVenda(idAssento, idVoo) {

    // Obter os dados armazenados em sessionStorage
    //'sessionStorege' armazena dados de forma simples e sem expiração, ou seja, ficam lá enquanto a guia estiver aberta (sessao)
    const nome = sessionStorage.getItem('nomeConfirmado');
    const email = sessionStorage.getItem('emailConfirmado');
    const idMetodo = sessionStorage.getItem('metodoPagamento');

    fetchInserir({
      nome: nome,
      email:email,
      idAssento: idAssento,
      idVoo: idVoo,
      idMetodo:idMetodo
    })
        .then(customResponse => {
            if (customResponse.status === "SUCCESS") {
                MessageStatus("Venda cadastrada... ", false);
            } else {
                MessageStatus("Erro ao cadastrar Venda...: " + customResponse.message, true);
                console.log(customResponse.message);
            }
        })
        .catch((e) => {
            MessageStatus("Erro técnico ao cadastrar... Contate o suporte.", true);
            console.log("Falha grave ao cadastrar." + e)
        });
}

//função para o botão, abre uma pagina html
function voltar(){
const idVoo = obterParametroUrl('idVoo');
window.location.href = `dados.html?idVoo=${idVoo}`;
}


function confirmar(){

// verificação se a compra tem voo de volta
// caso tenha, faz uma inserção na tabela de venda da primeira passagem e segue para a segunda
    const volta = sessionStorage.getItem('volta');
    if(volta !== "false"){

    // pega valores do assento e do voo da primeira passagem
    idAssento1 = sessionStorage.getItem('idAssento1');
    idVoo1 = sessionStorage.getItem('idVoo1');
    console.log('id ASSENTO 1:', idAssento1, 'id voo1:', idVoo1);
    
    inserirVenda(idAssento1,idVoo1);
    } 

    // pega valores do assento e do voo da passagem
    idAssento = sessionStorage.getItem('idAssento');
    idVoo = sessionStorage.getItem('idVoo');

    console.log('id ASSENTO:', idAssento, 'id voo:', idVoo); // verificacao no console

    // chama funcao para inserir venda
    inserirVenda(idAssento, idVoo);
    window.location.href = 'aprovado.html';
}

// funcao para validar dados do cartao de credito e inserir venda chamando a func "confirmar()"
function validar() {
    // Obter os valores dos campos
    const nome = document.getElementById('name').value;
    const numeroCartao = document.getElementById('numero').value;
    const cvv = document.getElementById('cvv').value;
    const validade = document.getElementById('Validade').value;

    // Validar os campos
    // as mensagens aparecem no navegador do usuario através da funcao "alert" do javascript
    if (nome.trim() === '') {
        alert('Por favor, preencha o campo Nome.');
        return false;
    }

    if (numeroCartao.trim() === '' || numeroCartao.length !== 16) {
        alert('Por favor, preencha o número do cartão corretamente.');
        return false;
    }

    if (numeroCartao.trim() === '0000000000000000') {
        alert('Compra negada. Parece que o número do cartão é inválido. Por favor, insira outro número');
        return false;
    }
    if (cvv.trim() === '' || cvv.length !== 3) {
        alert('Por favor, preencha o CVV corretamente.');
        return false;
    }

    if (validade.trim() === '') {
        alert('Por favor, preencha a data de validade.');
        return false;
    }
    
    confirmar();

}