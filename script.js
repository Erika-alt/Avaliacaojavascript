const alucard = document.querySelector('.alucard');
const pulosQuantidade = document.getElementById('pulos_quantidade');
const inimigosQuantidade = document.getElementById('inimigos_quantidade');
const botaoPulo = document.querySelector('.botao_pulo');
const botaoAtaque = document.querySelector('.botao_ataque');
let jumpContagem = 0;
let inimigosContagem = 0;
let jogoAcabou = false;
let alucardAtacando = false;

const jump = () => {

    if (jogoAcabou == false){
        if (!alucard.classList.contains('jump') && !alucardAtacando) {
            alucard.classList.add('jump');
            jumpContagem++;
            pulosQuantidade.innerText = 'Pulos: ' + jumpContagem;

            setTimeout(() => { 
                alucard.classList.remove('jump');
            }, 500);
        }
    }
        
}

const ataque = () => {
    if (jogoAcabou == false && !alucard.classList.contains('jump') && !alucardAtacando) {
        alucardAtacando = true;
        alucard.src = 'assets/imgs/Ataque.gif'; 
        alucard.classList.add('atacando');
        setTimeout(() => {
            if (jogoAcabou == false) {
                alucard.src = 'assets/imgs/Alucard.gif';
                alucard.classList.remove('atacando');
            }
            alucardAtacando = false;
        }, 500); 
    } 
}

const zumbi = document.querySelector('.zumbi');
const morcego = document.querySelector('.morcego');
const morcego2 = document.querySelector('.morcego2');
const gameOver = document.querySelector('.game-over');
const restartButton = document.querySelector('.restart');

const loop = setInterval(() => {

    const zumbiPosition = zumbi.offsetLeft;
    const alucardPosition = +window.getComputedStyle(alucard).bottom.replace('px', '');
    const morcegoPosition = +window.getComputedStyle(morcego).left.replace('px', '');
    const morcego2Position = +window.getComputedStyle(morcego2).left.replace('px', '');
    const limiteColisao = window.innerWidth <= 620 ? 70 : 100;


    if (zumbiPosition <= limiteColisao && zumbiPosition > 0 && alucardPosition < 60) {

        if (alucardAtacando) {
            inimigosContagem++;
            inimigosQuantidade.innerText = 'Inimigos derrotados: ' + inimigosContagem;

            zumbi.style.animation = 'none';
            zumbi.style.left = '2000px'; 
            
            setTimeout(() => {
                zumbi.style.left = ``; 
                zumbi.style.animation = 'zumbi-animations 1.5s infinite linear'; 
            }, 10);
        }

        else{
            jogoAcabou = true;

            zumbi.style.animation = 'none';
            zumbi.style.left = `${zumbiPosition}px`;

            alucard.style.animation = 'none';
            alucard.style.bottom = `${alucardPosition}px`;

            alucard.src = 'assets/imgs/DEATH.gif';
            alucard.classList.add('derrota')

            alucard.style.marginLeft = '50px';
            morcego.style.animation = 'morcego 5s infinite linear';
            morcego.style.left = `${morcegoPosition}px`;
            morcego2.style.animation = 'morcego 6.2s infinite linear';
            morcego2.style.left = `${morcego2Position}px`;

            gameOver.style.visibility = 'visible';

            clearInterval(loop);
        }
    }

}, 10);

const restart = () => {

    jogoAcabou = false;
    jumpContagem = 0;
    inimigosContagem = 0;
    alucardAtacando = false;

    pulosQuantidade.innerText = 'Pulos: '+jumpContagem;
    inimigosQuantidade.innerText = 'Inimigos derrotados: ' + inimigosContagem;
    gameOver.style.visibility = 'hidden';
    zumbi.style.animation = 'zumbi-animations 1.5s infinite linear';
    zumbi.style.left = ``;

    alucard.src = 'assets/imgs/Alucard.gif';
    alucard.classList.remove('derrota');
    alucard.style.bottom = '';
    alucard.style.animation = '';
    morcego.style.left = ``;
    morcego2.style.left = ``;

    const loop = setInterval(() => {

        const zumbiPosition = zumbi.offsetLeft;
        const alucardPosition = +window.getComputedStyle(alucard).bottom.replace('px', '');
        const morcegoPosition = +window.getComputedStyle(morcego).left.replace('px', '');
        const morcego2Position = +window.getComputedStyle(morcego2).left.replace('px', '');
        const limiteColisao = window.innerWidth <= 620 ? 70 : 100;
    
        if (zumbiPosition <= limiteColisao && zumbiPosition > 0 && alucardPosition < 60) {
    
            if (alucardAtacando) {
            inimigosContagem++;
            inimigosQuantidade.innerText = 'Inimigos derrotados: ' + inimigosContagem;

            zumbi.style.animation = 'none';
            zumbi.style.left = '2000px'; 
            
            setTimeout(() => {
                zumbi.style.left = ``; 
                zumbi.style.animation = 'zumbi-animations 1.5s infinite linear'; 
            }, 10);
            }

            else{
                jogoAcabou = true;

                zumbi.style.animation = 'none';
                zumbi.style.left = `${zumbiPosition}px`;
        
                alucard.style.animation = 'none';
                alucard.style.bottom = `${alucardPosition}px`;
        
                alucard.src = 'assets/imgs/DEATH.gif';
                alucard.classList.add('derrota');
        
                morcego.style.animation = 'morcego 5s infinite linear';
                morcego.style.left = `${morcegoPosition}px`;
                morcego2.style.animation = 'morcego 6.2s infinite linear';
                morcego2.style.left = `${morcego2Position}px`;
        
                gameOver.style.visibility = 'visible';

                clearInterval(loop);
            }
        }
    }, 10);

}

document.addEventListener('keydown', (tecla) => {
    if (tecla.key === ' ' || tecla.key === 'ArrowUp') {
        jump();
    } else if (tecla.key === 'f' || tecla.key === 'F') {
        ataque();
    }
});

botaoPulo.addEventListener('touchstart', jump);
botaoAtaque.addEventListener('touchstart', ataque);

restartButton.addEventListener('pointerdown', restart);
