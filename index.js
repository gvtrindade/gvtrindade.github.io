//Declarar os elementos
const paginas = document.getElementsByClassName("pagina");
const areaRolante = document.getElementById("areaRolante");
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
  if (areaRolante.scrollTop === 0 && evento.wheelDelta > 0) {
    rolarPagina(paginaAtual - 1);
  } else {
    rolarPagina(paginaAtual + 1);
  }
}

//Rolar pagina ao passar o dedo pra cima
let touchStartY = 0;
let touchEndY = 0;
const zonaMorta = 200;

window.addEventListener(
  "touchstart",
  (event) => (touchStartY = event.touches[0].screenY)
);

window.addEventListener(
  "touchmove",
  (event) => (touchEndY = event.touches[0].screenY)
);

window.addEventListener("touchend", () => {
  const distanciaMovimento = calcularDistanciaMovimento(touchStartY, touchEndY);
  if (areaRolante.scrollTop === 0 && distanciaMovimento > zonaMorta) {
    touchStartY > touchEndY ? rolarPagina(paginaAtual + 1) : rolarPagina(paginaAtual - 1);
  }
});

function calcularDistanciaMovimento(touchStartY, touchEndY) {
  return Math.abs(touchEndY - touchStartY);
}

//Rolar pagina ao clicar nos botões
function rolarPagina(proxPagina) {

  if (proxPagina === paginaAtual) return;
  if (proxPagina < primeiraPagina || proxPagina > totalDePaginas) return;

  travarAcoes(true);

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

  Array.from(paginas).forEach((elemento) => {
    elemento.style.transform = `translateY(${valorTranslate})`;
  });

  areaRolante.scrollTop = 0;
  animacaoPagina(proxPagina);
  alterarCorDoIndicador(proxPagina);
  paginaAtual = proxPagina;

  travarAcoes(false);
}

//Alterar aspecto do indicador da pagina atual
function animacaoPagina(proxPagina) {
  svgPaginas[paginaAtual].classList.toggle("ativo");
  svgPaginas[proxPagina].classList.toggle("ativo");
}

function alterarCorDoIndicador(proxPagina) {
  Array.from(svgPaginas).forEach(indicador => {
    const linha = indicador.children[0];
    if (proxPagina === 0 || !linha.classList.contains('invertido')) {
      linha.classList.toggle('invertido');
    }
  })
}

function travarAcoes(estado) {
  if (estado) {

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
