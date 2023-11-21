axios.get("http://127.0.0.1:5000/list").then((response) => {
  getData(response.data);
});

function getData(dados){
    dados.map((item)=>{
        tabela.innerHTML += `
            <tr>
                <th scope="row" class="text-center align-middle">${item.ID}</th>
                <td class="text-center align-middle">${item.TAREFA}</td>
                <td class="text-center align-middle">
                    <button class="btn btn-primary" onclick="editar" data-toggle="modal" data-target="#modalEditar">Editar</button>
                    <button class="btn btn-danger" onclick="confirmarDelecao">Deletar</button>
                </td>
            </tr>          
                `
    })
}

axios.get("http://127.0.0.1:5000/add").then((response) => {
    getData(response.data);
});

function adicionarTarefa() {
    const novaTarefaInput = document.getElementById('nova-tarefa').value;

    if (novaTarefaInput === "") {
        alert("Por favor, insira uma nova tarefa.");
        return;
    }
    const ultimaTarefa = tabela.lastElementChild;
    let novaID = 1;

    if (ultimaTarefa) {
        novaID = parseInt(ultimaTarefa.querySelector('th').textContent) + 1;
    }

    tabela.innerHTML += `
        <tr>
            <th scope="row" class="text-center align-middle">${novaID}</th>
            <td class="text-center align-middle">${novaTarefaInput}</td>
            <td class="text-center align-middle">
                <button class="btn btn-primary" data-toggle="modal" data-target="#modalEditar">Editar</button>
                <button class="btn btn-danger" onclick="confirmarDelecao()">Deletar</button>
            </td>
        </tr>          
    `;

    document.getElementById('nova-tarefa').value = "";

    $('#modalExemplo').modal('hide');
}


