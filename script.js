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
        document.getElementById('vez-jogador').textContent = `Vez de: ${vezJogador} (${this.jogadorAtual})`;
    }

    reiniciarTabuleiro() {
        this.tabuleiro = Array(9).fill(null);
        this.jogadorAtual = 'X';
        this.jogoAtivo = true;
        document.querySelectorAll('.celula').forEach(celula => celula.textContent = '');
        document.getElementById('mensagem-resultado').textContent = '';
        this.atualizarVezJogador();  // Atualiza o indicador de vez após reiniciar
    }

    reiniciarPlacar() {
        this.placarJogador1 = 0;
        this.placarJogador2 = 0;
        this.atualizarPlacar();
    }

    atualizarPlacar() {
        document.getElementById('placar-jogador1').textContent = `${this.jogador1} (X): ${this.placarJogador1}`;
        document.getElementById('placar-jogador2').textContent = `${this.jogador2} (O): ${this.placarJogador2}`;
    }

   

    verificarVencedor() {
        const combinacoesVencedoras = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
            [0, 4, 8], [2, 4, 6]  // Diagonais
        ];

        for (let combinacao of combinacoesVencedoras) {
            const [a, b, c] = combinacao;
            if (this.tabuleiro[a] && this.tabuleiro[a] === this.tabuleiro[b] && this.tabuleiro[a] === this.tabuleiro[c]) {
                return this.tabuleiro[a];
            }
        }

        return null;
    }

    verificarEmpate() {
        return this.tabuleiro.every(celula => celula !== null);
    }

    jogada(index) {
        if (!this.jogoAtivo || this.tabuleiro[index]) return;

        this.tabuleiro[index] = this.jogadorAtual;
        document.querySelector(`[data-index='${index}']`).textContent = this.jogadorAtual;

        const vencedor = this.verificarVencedor();

        if (vencedor) {
            this.jogoAtivo = false;
            if (vencedor === 'X') {
                this.placarJogador1++;
                document.getElementById('mensagem-resultado').textContent = `${this.jogador1} venceu!`;
            } else {
                this.placarJogador2++;
                document.getElementById('mensagem-resultado').textContent = `${this.jogador2} venceu!`;
            }
            this.atualizarPlacar();
        } else if (this.verificarEmpate()) {
            this.jogoAtivo = false;
            document.getElementById('mensagem-resultado').textContent = 'Empate!';
        } else {
            this.jogadorAtual = this.jogadorAtual === 'X' ? 'O' : 'X';
            this.atualizarVezJogador();  // Atualiza a vez do jogador a cada jogada
        }
    }
}

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

function reiniciarPartida() {
    jogo.reiniciarTabuleiro();
}

function reiniciarJogo() {
    document.getElementById('entrada-nomes').classList.remove('oculto');
    document.getElementById('jogo-container').classList.add('oculto');
    jogo.reiniciarPlacar();
}