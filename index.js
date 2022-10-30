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
  if (document.querySelector(`.linguas__${lingua}`).classList.contains('inativo')) {
    document.querySelector('.linguas__En').classList.toggle('inativo');
    document.querySelector('.linguas__Pt').classList.toggle('inativo');
  }
}

//Rolar pagina com a roda do mouse
function adicionarEventosScroll() {
  window.addEventListener("mousewheel", rolarPaginaPeloScroll);
  window.addEventListener("DOMMouseScroll", rolarPaginaPeloScroll);

  window.addEventListener("touchstart", calcularToutchStart);
  window.addEventListener("touchend", calcularToutchEnd);
}

function removerEventosScroll() {
  window.removeEventListener("mousewheel", rolarPaginaPeloScroll);
  window.removeEventListener("DOMMouseScroll", rolarPaginaPeloScroll);

  window.removeEventListener("touchstart", calcularToutchStart);
  window.removeEventListener("touchend", calcularToutchEnd);
}

adicionarEventosScroll();
paginas[0].addEventListener("transitionend", () => adicionarEventosScroll());

function rolarPaginaPeloScroll(evento) {
  if (areaRolante.scrollTop === 0 && (evento.wheelDelta > 0 || evento.detail < 0)) {
    rolarPagina(paginaAtual - 1);
  } else {
    rolarPagina(paginaAtual + 1);
  }
}

//Rolar pagina com o touch
let touchStartY = 0;
let touchEndY = 0;
const OFFSET_TOUCH = 10;

function calcularToutchStart(event) {
  touchStartY = event.changedTouches[0].pageY;
}

function calcularToutchEnd(event) {
  touchEndY = event.changedTouches[0].pageY;
  rolarPaginaPeloTouch();
}

function calcularOffset() {
  return Math.abs(touchEndY - touchStartY) > OFFSET_TOUCH;
}

function rolarPaginaPeloTouch() {
  if (areaRolante.scrollTop === 0 && calcularOffset()) {
    touchStartY > touchEndY ? rolarPagina(paginaAtual + 1) : rolarPagina(paginaAtual - 1);
  }
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
  Array.from(svgPaginas).forEach(indicador => {
    const linha = indicador.children[0];
    if (proxPagina === 0 || !linha.classList.contains("invertido")) {
      linha.classList.toggle("invertido");
    }
  });

  if (checarUltimaPagina(proxPagina)) {
    document.querySelector('.linguas').classList.toggle("invertido");
    document.querySelectorAll('.linguas button').forEach(elemento => elemento.classList.toggle("invertido"));
  }
}

function checarUltimaPagina(proxPagina) {
  if (screen.width < 900) {
    return proxPagina === 0 || !document.querySelector(".linguas").classList.contains('invertido');
  }
  return proxPagina === 2 || (proxPagina === 1 && document.querySelector(".linguas").classList.contains('invertido'));
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