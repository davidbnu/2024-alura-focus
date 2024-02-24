Aula 01
    HTML - script - defer.
    Pegar o elemento html da página
    Pegar o botão foco da página
    Pegar o botão curto da página
    Arrow function
    
    Adicionando o evento de click em um botão com o addEventListener
    
    E alterando um atributo de uma tag com setAttribute
        focoBt.addEventListener('click', () = > {
            html.setAttribute('data-contexto', 'foco');
        })

    Para cada botão, adicionar o atributo relacionado no html
        Método addEventListener e o setAttribute

Aula 02
    Alterar as imagens a partir do click.   
        const btLongo = document.querySelector('.app__card-button--longo');
    Buscar a imagem - classe app__image
    Altera o atribito de src da imagem.
        banner.setAttribute('src','./imagens/descanso-longo.png');
    
    Criar uma função dinamica para alterar a cor e o banner, alterando o contexto.
        function alterarContexto(contexto) {
            console.log(contexto);
            elementHtml.setAttribute('data-contexto',contexto);
            banner.setAttribute('src',`./imagens/${contexto}.png`);
        }

    Alterar o texto de acordo com o contexto - innerHTML
    O innerHTML é usado quando queremos passar um valor completo ao html.
        Buscar o title e colocar em uma variável;
        Alterar o texto utilizando switchcase
            switch(contexto) {
                case 'foco':
                    titulo.innnerHTML = `Otimize sua produtividade, <br> <strong class="app__title-strong">
                    Mergulhe no que importa. </strong>`;
                    break;
                case 'descanso-curto':
                    titulo.innerHTML = `Que tal dar uma respirada <br> <strong class="app__title-strong">
                    Faça uma pausa curta. </strong>`;
                    break;
                case 'descanso-longo':
                    titulo.innerHTML = `Hora de volta à suporfíce
                    <br> <strong class="app__title-strong">
                    Faça uma pausa Longa. </strong>`;
                    break; 
                default:
                    break;                                 
            }
    Adicionando e removendo classe de um elemento com o class list.add e classList.remove
    Declarando uma classe
    Gerando o play e pause em um Audio

Aula04
    Inserindo o temporizador
