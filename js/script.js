const elementHtml = document.querySelector('html');
const btFoco = document.querySelector('.app__card-button--foco');
const btCurto = document.querySelector('.app__card-button--curto');
const btLongo = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const tituloPagina = document.querySelector('.app__title');
const listaBotoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const startPauseBt = document.querySelector('#start-pause');
const btIniciarPausar = document.querySelector('#start-pause span');
const imgPlayPause = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

//Estamos dando um new na classe Audio
const musica = new Audio('./sons/luna-rise-part-one.mp3');
const musicaPlay = new Audio('./sons/play.wav');
const musicaPause = new Audio('./sons/pause.mp3');
const musicaBeep = new Audio('./sons/beep.mp3');

musica.loop = true;

//utiliza se change posi é o padrão para liga e desliga
musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
    console.log(musica.currentTime)
})

btFoco.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    btFoco.classList.add('active');
})

btCurto.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    btCurto.classList.add('active');

})

btLongo.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    btLongo.classList.add('active');

})

function alterarContexto(contexto) {
    listaBotoes.forEach(function(contexto){
        contexto.classList.remove('active');
    })

    mostrarTempo();
    elementHtml.setAttribute('data-contexto',contexto);
    banner.setAttribute('src',`./imagens/${contexto}.png`);

    switch(contexto){
        case 'foco':
            tituloPagina.innerHTML = `Otimize sua produtividade. <br> <strong class="app__title-strong"> 
                mergulhe no que importa.</strong>`;
                break;
        case 'descanso-curto':
            tituloPagina.innerHTML = `Que tal dar uma respirada, <br> <strong class="app__title-strong"> 
            faça uma pausa curta.</strong>`;
            break;
        case 'descanso-longo':
            tituloPagina.innerHTML = `Volte para a sua vida, <br> <strong class="app__title-strong"> 
            faça uma pausa longa.</strong>`;
            break;
            
        default:
            break;
    }

}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0){
        musicaBeep.play();
        alert('tempo finalizado');
        zerar();
        btIniciarPausar.textContent = 'Começar';
        imgPlayPause.setAttribute('src','./imagens/play_arrow.png')
        return;
    }

    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
    
}

function iniciarPausar() {
    if (intervaloId){
        musicaPause.play();
        zerar();
        return;
    }
    musicaPlay.play();
    intervaloId = setInterval(contagemRegressiva,1000);
    btIniciarPausar.textContent = 'Pausar';
    imgPlayPause.setAttribute('src','./imagens/pause.png')

}

function zerar(){
    clearInterval(intervaloId);
    btIniciarPausar.textContent = 'Começar';
    imgPlayPause.setAttribute('src','./imagens/play_arrow.png')
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleString('pt-Br', {minute: '2-digit', second: '2-digit'});
    console.log(tempoFormatado);
    tempoNaTela.innerHTML = `${tempoFormatado}`;

}

mostrarTempo();
startPauseBt.addEventListener('click', iniciarPausar);

