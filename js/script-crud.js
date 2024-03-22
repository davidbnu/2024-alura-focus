// encontrar o botão adicionar tarefa

//Declarando as variáveis.
const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const btnCancelarTarefa = document.querySelector('.app__form-footer__button--cancel');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textarea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description');

const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas');
const btnRemoverTodas = document.querySelector('#btn-remover-todas');

//Carrego a lista de tarefas da local storage para minha  lista da aplicação
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []; 
let tarefaSelecionada = null;
let liTarefaSelecionada = null;

//Grava a lista da aplicação para a LocalStorage
function atualizarTarefas () {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
                fill="#01080E"></path>
        </svg>
    `
    const paragrafo = document.createElement('p')
    paragrafo.textContent = tarefa.descricao
    paragrafo.classList.add('app__section-task-list-item-description')

    const botao = document.createElement('button')
    botao.classList.add('app_button-edit')

    botao.onclick = () => {
        const novaDescricao = prompt("Qual é o novo nome da tarefa?")
        // console.log('Nova descrição da tarefa: ', novaDescricao)
        //if novaDescricao valida se a descrição está preenchida ou não.
        if (novaDescricao) {            
            paragrafo.textContent = novaDescricao;
            tarefa.descricao = novaDescricao;
            atualizarTarefas();
        }
    }

    const imagemBotao = document.createElement('img')
    imagemBotao.setAttribute('src', './imagens/edit.png')
    botao.append(imagemBotao)

    li.append(svg)
    li.append(paragrafo)
    li.append(botao)

    if (tarefa.completa) {
        li.classList.add('app__section-task-list-item-complete');
        botao.setAttribute('disable','disable');
    } else {
        li.onclick = () => {
            //Vamos receber um array de elementos e já vamos usar eles aqui
            document.querySelectorAll('.app__section-task-list-item-active')
                .forEach(elemento => {
                    elemento.classList.remove('app__section-task-list-item-active');
                })
            
            //Compara se a tarefa clicada é a tarefa que está em andamento
            //Se isso acontecer é para limpar ela.
            //Se isso acontecer a gente também para a execução do código
            if (tarefaSelecionada == tarefa) {
                paragrafoDescricaoTarefa.textContent = '';
                tarefaSelecionada = null;
                liTarefaSelecionada = null;
                return;
            }
    
            tarefaSelecionada = tarefa;
            liTarefaSelecionada = li;
            paragrafoDescricaoTarefa.textContent = tarefa.descricao;
    
            li.classList.add('app__section-task-list-item-active');
        }
    }

    return li
}   

btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden')
})


/*
Quanndo o usuário estiver digitando uma tarefa e cancelar, limpa o conteudo do formulario e esconde ele

Selecionar o botão cancelar
Adicionar o evento nele
    Quando clicado
        Limpar o texto do textArea
        Fechar o formulario de digitação



// Selecione o botão de Cancelar que adicionamos ao formulário
const btnCancelar = document.querySelector('.app__form-footer__button--cancel');

// Crie uma função para limpar o conteúdo do textarea e esconder o formulário
const limparFormulario = () => {
    textarea.value = '';  // Limpe o conteúdo do textarea
    formularioTarefa.classList.add('hidden');  // Adicione a classe 'hidden' ao formulário para escondê-lo
}

// Associe a função limparFormulario ao evento de clique do botão Cancelar
btnCancelar.addEventListener('click', limparFormulario);

*/
btnCancelarTarefa.addEventListener('click', () => {
    textarea.value = '';
    formAdicionarTarefa.classList.toggle('hidden');

})

formAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: textarea.value
    }
    //tarefas é uma lista
    //tarefa é um objeto criado que possui a descricao e o valor é o que foi informando no textarea.value
    //Então inserimos a tarefa(objeto) na lista de tarefas
    tarefas.push(tarefa);
    const elementoTarefa = criarElementoTarefa(tarefa); //cria o elemento
    ulTarefas.append(elementoTarefa); //coloca o elemento na página
    atualizarTarefas();
    textarea.value = '';
    formAdicionarTarefa.classList.add('hidden');
})

document.addEventListener('FocoFinalizado', () => {
    if (tarefaSelecionada && liTarefaSelecionada) {
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active');
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete');
        liTarefaSelecionada.querySelector('button').setAttribute('disable','disable');
        tarefaSelecionada.completa = true;
        atualizarTarefas();

    }
})

const removerTarefas = (somenteCompletas) => {
    //se somente completas ele pega as completas se não ele pega tudo
    const seletor = somenteCompletas ? '.app__section-task-list-item-complete' : '.app__section-task-list-item';
    
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove();//O elemento se remove do DOM
    })

    //Filtrando os elementos que não estão completo
    //Queremos tirar da lista os itens completos. Então selecionamos a própria lista de tarefas  e 
    // colocamos a condição completa false. 
    //Isso irá retornar a prorpria lista sem os itens que estão completos.
    tarefas = somenteCompletas ? tarefas.filter(tarefa => !tarefa.completa) : [];
    atualizarTarefas();

}

tarefas.forEach( tarefa =>  {
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
});

//Vamos passar apenas a referencia da função removerTarefas sem executar ela (por isso a ausencia das ())
//Quando o onClick acontecer, o removerTarefas vai executar corretamente.
btnRemoverConcluidas.onclick = () => removerTarefas(true);

btnRemoverTodas.onclick = () => removerTarefas(false);


