const tabela = document.querySelector('.tabela-js')

axios.get('http://127.0.0.1:5000/list').then((response) => {
    getData(response.data)
})
    .catch(function (error) {
        console.log(error)
    })

function getData(dados){
    dados.map((item)=>{
        tabela.innerHTML += `
            <tr>
                <th scope="row" class="text-center align-middle">${item.ID}</th>
                <td class="text-center align-middle">${item.TAREFA}</td>
                <td class="text-center align-middle">
                    <button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#modaleditar">Editar</button>
                    <button class="btn btn-danger delete-btn" type="button" data-bs-toggle="modal" onclick="excluir(${item.ID})" data-bs-target="#modalexcluir">Deletar</button>
                </td>
            </tr>
                `
    })
}

// Função para adicionar uma nova tarefa

function adicionarTarefa(){
    const input = document.getElementById("recipient-name").value

    if (input.trim() !==""){
        const apiUrl = 'http://127.0.0.1:5000/add'
        const Tarefa = {
            Tarefa: input
        }
        axios.post(apiUrl, Tarefa)
        .then(function(response){
            console.log("Informação adicionada com sucesso:", response.data);
        })
        .catch(error => {
        console.error('Erro ao adicionar informação à API:', error);
        });
    }else{
        alert("Por favor, insira uma informação antes de adicionar à API.")
    }
}

// Função para excluir uma tarefa 
// Aqui ele vai pegar o ID da tarefa que queremos excluir e armazenar na variável deletarId, que será usada na função excluirTarefa()
// Além disso, ele printa no console o ID da tarefa que queremos excluir
function excluir(id) {
    console.log("Item a ser excluído: ", id);
    deletarId = id;  // Atribua o valor do ID à variável deletarId
}

function excluirTarefa() {
    if (deletarId === undefined) {
        console.error('ID não definido para exclusão.');
        return;
    }

    axios.delete(`http://127.0.0.1:5000/delete/${deletarId}`)
        .then(response => {
            console.log('Item excluído com sucesso:', response.data);
            alert('Item excluído com sucesso!');
        })
        .catch(error => {
            console.error('Erro ao excluir o item:', error);
            alert('Erro ao excluir item.');
        });

    deletarId = null;  // Limpe a variável após a exclusão
}

// Função para editar uma tarefa
// Aqui ele vai pegar o ID da tarefa que queremos editar e armazenar na variável editarId, que será usada na função editarTarefa()

function editar(id) {
    console.log("Item a ser editado: ", id);
    editarId = id;  // Atribua o valor do ID à variável editarId
}

function editarTarefa() {
    if (editarId === undefined) {
        console.error('ID não definido para edição.');
        return;
    }

    const input = document.getElementById("recipient-name-edit").value

    if (input.trim() !==""){
        const apiUrl = "http://127.0.0.1:5000" + "/update/" + editarId
        const Tarefa = {
            Tarefa: input
        }
        axios.put(apiUrl, Tarefa)
        .then(function(response){
            console.log("Informação editada com sucesso:", response.data);
        })
        .catch(error => {
        console.error('Erro ao editar informação à API:', error);
        }
        );
    }
    editarId = null;  // Limpe a variável após a edição
}
