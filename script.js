let jogo;
function iniciarJogo() {
    const jogador1 = document.getElementById('jogador1').value || 'Jogador 1';
    const jogador2 = document.getElementById('jogador2').value || 'Jogador 2';

    jogo = new JogoDaVelha(jogador1, jogador2);
    document.getElementById('entrada-nomes').classList.add('oculto');
    document.getElementById('jogo-container').classList.remove('oculto');
    jogo.atualizarPlacar();

    document.querySelectorAll('.celula').forEach(celula => {
        celula.addEventListener('click', function() {
            jogo.jogada(this.getAttribute('data-index'));
        });
    });
}

class JogoDaVelha {
    constructor(jogador1, jogador2) {
        this.jogador1 = jogador1;
        this.jogador2 = jogador2;
        this.placarJogador1 = 0;
        this.placarJogador2 = 0;
        this.jogadorAtual = 'X';
        this.tabuleiro = Array(9).fill(null);
        this.jogoAtivo = true;
        this.atualizarVezJogador();  // Atualiza o indicador de vez do jogador
    }

    atualizarVezJogador() {
        const vezJogador = this.jogadorAtual === 'X' ? this.jogador1 : this.jogador2;
        document.getElementById('vez-jogador')
        .textContent = `Vez de: ${vezJogador} (${this.jogadorAtual})`;
    }

    reiniciarTabuleiro() {
        this.tabuleiro = Array(9).fill(null);
        this.jogadorAtual = 'X';
        this.jogoAtivo = true;
        document.querySelectorAll('.celula').forEach(celula => celula.textContent = '');
        document.getElementById('mensagem-resultado').textContent = '';
        this.atualizarVezJogador();  // Atualiza o indicador de vez após reiniciar
    }

    
}