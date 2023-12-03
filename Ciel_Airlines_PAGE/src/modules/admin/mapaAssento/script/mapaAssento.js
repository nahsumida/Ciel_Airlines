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
/* LISTAR */
    function fetchListarAssento(body){
            console.log("cheguei no fetch")
            const requestOptions = {
                method: 'POST', headers: {'Content-Type' : "application/json"}, body: JSON.stringify(body)
            };

            return fetch('http://localhost:3000/selectAssentoByVoo', requestOptions).then(T => T.json())
    }

// Função para listar assentos de um voo específico
function ListarAssentos(idVoo) {
    const dataBody = document.getElementById('dataBody');
    
    // Chama a função de requisição para listar os assentos do voo com o ID fornecido
    fetchListarAssento({
        idVoo: idVoo
    })
    .then(customResponse => {
        if(customResponse.status === "SUCCESS"){
        // Limpa qualquer conteúdo anterior da tabela
        dataBody.innerHTML = '';

        // Preenche a tabela com os dados da resposta
        customResponse.payload.forEach(item => {
            const idAssento = item[0];
            const idVoo = item[1];
            const codigo = item[2];
            const status  = item[3];
        

            const row = dataBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);
            

            cell1.textContent = idAssento;
            cell2.textContent = idVoo;
            cell3.textContent = codigo;
            cell4.textContent =  status;
        });

        // criamos um array de arrays contendo o primeiro item da resposta
        // pega os idAssentos
        //let payload = customResponse.payload.map(item => item[0]);
        //return(payload); 

    } else {
        MessageStatus("Erro ao listar assentos...: " + customResponse.message, true);
        console.log(customResponse.message);
    }
})
.catch((e) => {
    MessageStatus("Erro técnico ao listar... Contate o suporte.", true);
    console.log("Falha grave ao listar." + e);
});
}


/*ALTERAR STATUS*/
function fetchAlterar(body) {
console.log("toaqui");
const requestOptions = {
    method: 'POST', headers: { 'Content-Type': "application/json" }, body: JSON.stringify(body)
};
return fetch('http://localhost:3000/updateAssento', requestOptions).then(T => T.json())
}

function UpdateStatus(idAssento, newStatus) {
    console.log(newStatus)
    fetchAlterar({
        idAssento: idAssento,
        status: newStatus
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
document.addEventListener("DOMContentLoaded", function() {
    const dataSelectListar = document.getElementById('dataSelectListar');
    listarComboBoxVoo(dataSelectListar);

    //const dataSelectUpdate = document.getElementById('dataSelectUpdate');
   // listarComboBoxVoo(dataSelectUpdate);

   dataSelectListar.addEventListener("change",function(){
        const idVoo = document.getElementById('dataSelectListar').value;
        console.log("voo selecionado", idVoo);

    });

    btnListar.addEventListener("click", function () {
        const idVoo = dataSelectListar.value;
        const dataSelectUpdate = document.getElementById('dataSelectUpdate');

        // Chama a função ListarAssentos e popula a selectBox com os IdAssentos
        ListarAssentos(idVoo)

    }); 
    
    btnUpdate.addEventListener("click", function () {
        event.preventDefault();  // Evita a ação padrão de envio de formulário

        const idAssento = document.getElementById('idAssento').value;
        const newAssento = document.getElementById('newAssento').value;
    
        console.log("ID do Assento:", idAssento);
        console.log("Status:", newAssento);
        UpdateStatus(idAssento,newAssento)

    }); 
});
