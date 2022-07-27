//Declarar os elementos
const paginas = document.getElementsByClassName("pagina");
const timeline = document.getElementById("timeline");
const svgPaginas = document.getElementsByClassName("indicadorNav");

//Declarar as variáveis
let paginaAtual = 0;
let primeiraPagina = 0;
let totalDePaginas = paginas.length - 1;

window.scrollTo({ top: 0, behavior: "smooth" });

//Rolar pagina com a roda do mouse
window.addEventListener("mousewheel", (e) => rodarMouse(e));
window.addEventListener("DOMMouseScroll", (e) => rodarMouse(e));
function rodarMouse(evento) {
  if (timeline.scrollTop === 0 && evento.wheelDelta > 0) {
    rolarPagina(paginaAtual - 1);
  } else {
    rolarPagina(paginaAtual + 1);
  }
}

//Rolar pagina ao passar o dedo pra cima
let touchStartY = 0;
let touchEndY = 0;

window.addEventListener(
  "touchstart",
  (event) => (touchStartY = event.touches[0].screenY)
);
window.addEventListener(
  "touchmove",
  (event) => (touchEndY = event.touches[0].screenY)
);

window.addEventListener("touchend", () => {
  if (timeline.scrollTop === 0) {
    touchStartY > touchEndY ? rolarPagina(paginaAtual + 1) : rolarPagina(paginaAtual - 1);
  }
});

//Rolar pagina ao clicar nos botões
function rolarPagina(proxPagina) {

  if (proxPagina === paginaAtual) return;
  if (proxPagina < primeiraPagina || proxPagina > totalDePaginas) return;

  switch (proxPagina) {
    case 0:
      valorTranslate = "0";
      break;
    case 1:
      valorTranslate = "-100vh";
      break;
    case 2:
      valorTranslate = "-200vh";
      break;
    default:
      valorTranslate = "0";
  }
  timeline.scrollTop = 0;
  animacaoPagina(proxPagina);
  alterarCorDoIndicador(proxPagina);

  Array.from(paginas).forEach((elemento) => {
    elemento.style.transform = `translateY(${valorTranslate})`;
  });
  paginaAtual = proxPagina;
}

//Alterar aspecto do indicador da pagina atual
function animacaoPagina(proxPagina) {
  svgPaginas[paginaAtual].classList.toggle("ativo");
  svgPaginas[proxPagina].classList.toggle("ativo");
}

function alterarCorDoIndicador(proxPagina) {
  if(proxPagina === 1 || proxPagina === 2){
    Array.from(svgPaginas).forEach(indicador => {
      indicador.classList.toggle('invertido')
    })
  }
}

//Mostrar/esconder descrição detalhada ao passar o mouse em cima do projeto
function mostrarDescDetalhada(elemento) {
  Array.from(elemento.children).forEach((filho) => {
    if (filho.className === "descCompleta") {
      filho.style = "display: block";
    }
    if (filho.className === "descSimples") {
      filho.style = "display: none";
    }
  });
}

function esconderDescDetalhada(elemento) {
  Array.from(elemento.children).forEach((filho) => {
    if (filho.className === "descCompleta") {
      filho.style = "display: none";
    }
    if (filho.className === "descSimples") {
      filho.style = "display: block";
    }
  });
}

//Organizar projetos
window.onload = () => {
  const projetos = document.getElementsByClassName("containerProjeto");
  organizarProjetos(projetos);
};

function organizarProjetos(projetos) {
  Array.from(projetos).forEach((projeto, index) => {
    if (Boolean(index % 2)) {
      let classeAntiga = projeto.className;
      projeto.className = `${classeAntiga} esquerda`;
    }
  });
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    Math.round(rect.bottom) <=
    (window.innerHeight || document.documentElement.clientHeight) &&
    Math.round(rect.right) <=
    (window.innerWidth || document.documentElement.clientWidth)
  );
}
