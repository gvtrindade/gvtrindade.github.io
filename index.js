//Declarar os elementos
import { textoPt, textoEn } from "./assets/texts/Textos.js"
import { carregarTextosProjetos } from "./projetos.js"
const paginas = document.querySelectorAll('.pagina');
const areaRolante = document.getElementById("areaRolante");
const projetos = document.querySelectorAll('.projeto');
const svgPaginas = document.getElementsByClassName("indicadorNav");

//Declarar as variáveis
const linguaNavegador = window.navigator.language.includes('pt') ? 'Pt' : 'En';
let paginaAtual = 0;
let primeiraPagina = 0;
let totalDePaginas = paginas.length - 1;

window.scrollTo({ top: 0, behavior: "smooth" });

const documentHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty('--doc-height', `${window.innerHeight}px`);
}
window.addEventListener("resize", documentHeight);
documentHeight();

//Carregar textos de acordo com a lingua
carregarTextos(linguaNavegador);
document.querySelector('.linguas__Pt').addEventListener('click', () => carregarTextos('Pt'));
document.querySelector('.linguas__En').addEventListener('click', () => carregarTextos('En'));

function carregarTextos(lingua) {
  selecionarLinguaAtiva(lingua);
  if (lingua === "Pt") {
    Object.entries(textoPt).forEach(texto => {
      document.getElementById(texto[0]).innerText = texto[1];
    });
    carregarTextosProjetos("Pt");
  } else {
    Object.entries(textoEn).forEach(texto => {
      document.getElementById(texto[0]).innerText = texto[1];
    });
    carregarTextosProjetos("En");
  }
}

function selecionarLinguaAtiva(lingua) {
  if (document.querySelector(`.linguas__${lingua}`).classList.contains('ativo')) {
    document.querySelector('.linguas__En').classList.toggle('ativo');
    document.querySelector('.linguas__Pt').classList.toggle('ativo');
  }
}

//Rolar pagina com a roda do mouse
function adicionarEventosScroll() {
  window.addEventListener("mousewheel", direcaoMovimentoPagina);
  window.addEventListener("DOMMouseScroll", direcaoMovimentoPagina);

  window.addEventListener("touchstart", calcularToutchStart);
  window.addEventListener("touchmove", calcularToutchEnd);
  window.addEventListener("touchend", direcaoMovimentoPagina);
}

function calcularToutchStart(event) {
  touchStartY = event.touches[0].screenY
}

function calcularToutchEnd(event) {
  touchEndY = event.touches[0].screenY
}

function removerEventosScroll() {
  window.removeEventListener("mousewheel", direcaoMovimentoPagina);
  window.removeEventListener("DOMMouseScroll", direcaoMovimentoPagina);

  window.removeEventListener("touchstart", calcularToutchStart);
  window.removeEventListener("touchmove", calcularToutchEnd);
  window.removeEventListener("touchend", direcaoMovimentoPagina);
}

adicionarEventosScroll();
paginas[0].addEventListener("transitionend", () => adicionarEventosScroll());

function direcaoMovimentoPagina(evento) {
  if (areaRolante.scrollTop === 0 && (evento.wheelDelta > 0 || evento.detail < 0)) {
    rolarPagina(paginaAtual - 1);
  } else {
    rolarPagina(paginaAtual + 1);
  }
  
  if (areaRolante.scrollTop === 0
    && calcularDistanciaMovimento(touchStartY, touchEndY) > zonaMorta) {
    if (window.getAttribute('listener') !== true) adicionarEventosScroll();
    touchStartY > touchEndY
      ? rolarPagina(paginaAtual + 1)
      : rolarPagina(paginaAtual - 1);
  }
}

//Rolar pagina ao passar o dedo pra cima
let touchStartY = 0;
let touchEndY = 0;
const zonaMorta = 300;

function calcularDistanciaMovimento(touchStartY, touchEndY) {
  return Math.abs(touchEndY - touchStartY);
}

//Rolar pagina ao clicar nos botões
document.querySelectorAll('.nav__ancora').forEach((elemento, key) => {
  elemento.addEventListener('click', () => rolarPagina(key));
})

function rolarPagina(proxPagina) {
  if (proxPagina === paginaAtual) return;
  if (proxPagina < primeiraPagina || proxPagina > totalDePaginas) return;

  let valorTranslate;
  removerEventosScroll();

  switch (proxPagina) {
    case 0:
      valorTranslate = "0";
      break;
    case 1:
      valorTranslate = "-100%";
      break;
    case 2:
      valorTranslate = "-200%";
      break;
    default:
      valorTranslate = "0";
  }

  Array.from(paginas).forEach((elemento) => {
    elemento.style.transform = `translateY(${valorTranslate})`;
  });

  areaRolante.scrollTop = 0;
  animacaoPagina(proxPagina);
  alterarCorDoIndicador(proxPagina);
  paginaAtual = proxPagina;

}

//Alterar aspecto do indicador da pagina atual
function animacaoPagina(proxPagina) {
  svgPaginas[paginaAtual].classList.toggle("ativo");
  svgPaginas[proxPagina].classList.toggle("ativo");
}

function alterarCorDoIndicador(proxPagina) {
  Array.from(svgPaginas).forEach((indicador) => {
    const linha = indicador.children[0];
    if (proxPagina === 0 || !linha.classList.contains("invertido")) {
      linha.classList.toggle("invertido");
    }
  });
}

//Animações de página
const observadorPagina = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const className = `${entry.target.id}__animacoes`;
    entry.target.classList.toggle(className, entry.isIntersecting);
  });
}, {
  threshold: 0.2,
});

paginas.forEach(pagina => { observadorPagina.observe(pagina) });

const observadorProjeto = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('projeto__animacoes', entry.isIntersecting);
    if (entry.isIntersecting) observadorProjeto.unobserve(entry.target);
  });

}, {
  threshold: 0.1,
});

projetos.forEach(projeto => { observadorProjeto.observe(projeto) });