// ======== SCRIPT PRINCIPAL ========

// Criador das lanterna flutuantes da Rapunzel
function criarLanternasPNG(qtd, src) {
  const container = document.getElementById('lanternas-background');

  for (let i = 0; i < qtd; i++) {
    const lanterna = document.createElement('img');
    lanterna.src = src; // caminho do seu PNG
    lanterna.classList.add('lanterna-flutuante');

    // Posição inicial aleatória
    lanterna.style.left = Math.random() * 100 + "vw";

    // Velocidade e duração aleatória
    lanterna.style.animationDuration = (8 + Math.random() * 5) + "s";

    // Tamanho aleatório para profundidade
    const scale = 0.5 + Math.random() * 0.7;
    lanterna.style.transform = `scale(${scale})`;

    container.appendChild(lanterna);

    // Remove quando animação termina e cria nova
    lanterna.addEventListener('animationend', () => {
      lanterna.remove();
      criarLanternasPNG(1, src);
    });
  }
}

// Cria lanternas PNG flutuando
criarLanternasPNG(15, "Images/lanterna.png");

// Carrossel Loop
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
let index = 0;

// Clonar slides para criar loop infinito
slides.forEach(slide => {
  const clone = slide.cloneNode(true);
  track.appendChild(clone);
});

function moverCarousel() {
  const slideWidth = slides[0].getBoundingClientRect().width;
  index++;
  track.style.transition = 'transform 0.5s ease-in-out';
  track.style.transform = `translateX(-${slideWidth * index}px)`;

  // Quando chegar no final dos slides originais, volta sem animação
  if(index >= slides.length) {
    setTimeout(() => {
      track.style.transition = 'none';
      index = 0;
      track.style.transform = `translateX(-${slideWidth * index}px)`;
    }, 500); // 500ms = duração da transição
  }
}

// Roda automaticamente a cada 3s
setInterval(moverCarousel, 3000);

// Efeito de digitação
document.addEventListener('DOMContentLoaded', () => {
  const texto = document.querySelector('.digitando');
  if (texto) {
    const textoCompleto = texto.textContent;
    texto.textContent = '';
    let i = 0;
    function digitar() {
      if (i < textoCompleto.length) {
        texto.textContent += textoCompleto.charAt(i);
        i++;
        setTimeout(digitar, 50);
      }
    }
    digitar();
  }
});

// Música play/pause
const botaoMusica = document.getElementById('botaoMusica');
const audio = document.getElementById('musicaFundo');
if (botaoMusica && audio) {
  botaoMusica.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      botaoMusica.textContent = '⏸ Pausar música';
    } else {
      audio.pause();
      botaoMusica.textContent = '▶ Tocar música';
    }
  });
}

// Cartas e envelopes
const envelopes = document.querySelectorAll('.envelope');
const popupCarta = document.getElementById('popup-carta');
const textoCarta = document.getElementById('texto-carta');
const fecharCarta = document.getElementById('fechar-carta');

envelopes.forEach(env => {
  env.addEventListener('click', () => {
    // Coloca o texto da carta
    textoCarta.textContent = env.dataset.mensagem;

    // Mostra o pop-up com animação
    popupCarta.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // impede rolar o fundo

    // Opcional: cria confetes quando abrir
    if (typeof criarConfetes === 'function') {
      criarConfetes(env);
    }
  });
});

// Fecha a carta
fecharCarta.addEventListener('click', () => {
  popupCarta.style.display = 'none';
  document.body.style.overflow = 'auto';
});

// Fecha clicando fora da carta
popupCarta.addEventListener('click', e => {
  if (e.target === popupCarta) {
    popupCarta.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});


// Mostrar mensagem especial
function mostrarMensagem() {
  const msg = document.getElementById('mensagemFinal');
  msg.classList.add('show');
  criarCoracoes();
  soltarConfete();
}

// Corações animados
function criarCoracoes() {
  for (let i = 0; i < 25; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = '💜';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (3 + Math.random() * 2) + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
  }
}

// Confete
function soltarConfete() {
  for (let i = 0; i < 40; i++) {
    const confete = document.createElement('div');
    confete.classList.add('confete');
    confete.textContent = ['💜', '✨', '🌸'][Math.floor(Math.random() * 3)];
    confete.style.left = Math.random() * 100 + 'vw';
    confete.style.animationDuration = (2 + Math.random() * 3) + 's';
    document.body.appendChild(confete);
    setTimeout(() => confete.remove(), 4000);
  }
}

// Lightbox galeria
const imagens = document.querySelectorAll('.gallery img');
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

imagens.forEach(img => {
  img.addEventListener('click', () => {
    lightbox.classList.add('ativo');
    const imagemExpandida = document.createElement('img');
    imagemExpandida.src = img.src;
    while (lightbox.firstChild) lightbox.removeChild(lightbox.firstChild);
    lightbox.appendChild(imagemExpandida);
  });
});

lightbox.addEventListener('click', e => {
  if (e.target !== e.currentTarget) return;
  lightbox.classList.remove('ativo');
});

// Fade in suave ao rolar
window.addEventListener('scroll', () => {
  document.querySelectorAll('.fade-in').forEach(el => {
    const pos = el.getBoundingClientRect().top;
    const tela = window.innerHeight;
    if (pos < tela - 100) el.classList.add('visivel');
  });
});

// Quiz do Casal
const perguntas = [
  {
    pergunta: "Qual foi a nossa primeira viagem juntos?",
    opcoes: ["Serra Negra", "Itatiba", "Maria da Fé", "Bertioga"],
    resposta: "Itatiba",
    feedback: "Boaaa, resposta certa! Foi na primeira vez que eu fui no sítio dos seus avós!😁"
  },
  {
    pergunta: "Quando foi o nosso primeiro beijo (selinho)?",
    opcoes: ["16/08/2024", "17/10/2024", "15/08/2024", "17/08/2024"],
    resposta: "16/08/2024",
    feedback: "Issooo! Lembro até hoje desse dia😘"
  },
  {
    pergunta: "Qual foi o primeiro filme que a gente viu no cinema juntos (como casal)?",
    opcoes: ["Star Wars", "Ferrari", "Divertidamente 2", "Harry Potter"],
    resposta: "Harry Potter",
    feedback: "Simmm, foi no dia do nosso primeiro date😍"
  },
  {
    pergunta: "Quem disse 'eu te amo' primeiro?",
    opcoes: ["Bibi", "Gugu", "Os dois juntos", "Nenhum"],
    resposta: "Bibi",
    feedback: "Simmm! Foi você que falou primeiro....💖"
  },
  {
    pergunta: "Qual é o nome do restaurante que o Gugu te pediu em namoro?",
    opcoes: ["La Serena", "Luce", "Bottega Bernacca", "Borges😳"],
    resposta: "Bottega Bernacca",
    feedback: "Issooo, escolhi esse a dedo!😘"
  }
];

let perguntaAtual = 0;

const perguntaTexto = document.getElementById("pergunta-texto");
const opcoesDiv = document.getElementById("opcoes");
const proximaBtn = document.getElementById("proxima-pergunta");
const feedback = document.getElementById("feedback");

function mostrarPergunta() {
  const p = perguntas[perguntaAtual];
  perguntaTexto.innerText = p.pergunta;
  opcoesDiv.innerHTML = "";
  feedback.innerText = "";
  proximaBtn.style.display = "none";

  p.opcoes.forEach(opcao => {
    const btn = document.createElement("button");
    btn.innerText = opcao;
    btn.addEventListener("click", () => {
      if(opcao === p.resposta){
        feedback.innerText = p.feedback;
      } else {
        feedback.innerText = "Não era essa a resposta certa mor... A correta é: " + p.resposta;
      }
      proximaBtn.style.display = "block";
      // Desabilita os botões após responder
      Array.from(opcoesDiv.children).forEach(b => b.disabled = true);
    });
    opcoesDiv.appendChild(btn);
  });
}

proximaBtn.addEventListener("click", () => {
  perguntaAtual++;
  if(perguntaAtual < perguntas.length){
    mostrarPergunta();
  } else {
    // Fim do quiz
    perguntaTexto.innerText = "Parabéns! Você completou o quiz 💕";
    opcoesDiv.innerHTML = "";
    proximaBtn.style.display = "none";
    feedback.innerText = "";
  }
});

// Inicia o quiz
mostrarPergunta();

// Contador de Dias Juntos
function calcularDiasJuntos() {
  const dataInicio = new Date(2024, 10, 17); // 17 de Outubro de 2024
  const hoje = new Date();
  const diffTime = Math.abs(hoje - dataInicio);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  document.getElementById('diasJuntos').textContent = `${diffDays} dias`;
}

calcularDiasJuntos();

// --- ÁREA SECRETA COM SENHA ---
const botaoSecreto = document.getElementById('botao-secreto');

// Cria o pop-up de senha dinamicamente (assim não precisa estar no HTML)
const popupSenha = document.createElement('div');
popupSenha.classList.add('popup-senha');
popupSenha.innerHTML = `
  <div class="caixa-senha">
    <h2>🔒 Digite a senha para continuar</h2>
    <h5>Dica: apelido que eu te chamava antes de começarmos a namorar</h5>
    <input type="password" id="input-senha" placeholder="Insira a senha aqui">
    <p id="mensagem-erro" style="color:#ff6b6b; margin-top:10px; display:none;"></p>
    <button id="confirmar-senha">Entrar</button>
    <button id="cancelar-senha">Cancelar</button>
  </div>
`;
document.body.appendChild(popupSenha);

botaoSecreto.addEventListener('click', () => {
  popupSenha.style.display = 'flex';
});

document.getElementById('cancelar-senha').addEventListener('click', () => {
  popupSenha.style.display = 'none';
});

const inputSenha = document.getElementById('input-senha');
const mensagemErro = document.getElementById('mensagem-erro');

document.getElementById('confirmar-senha').addEventListener('click', () => {
  const senha = inputSenha.value.trim();
  const senhaCorreta = "bibo";

  if (senha === senhaCorreta) {
    window.location.href = "video.html";
  } else {
    mensagemErro.textContent = "Senha incorreta 💔";
    mensagemErro.style.display = "block";
    inputSenha.value = ""; // limpa o campo para tentar de novo
    inputSenha.focus();
  }
});