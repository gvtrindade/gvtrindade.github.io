
//Rolar pagina com a roda do mouse
const paginas = document.getElementsByClassName('pagina');
let paginaAtual = 0;
let primeiraPagina = 0;
let totalDePaginas = paginas.length - 1;

window.addEventListener('mousewheel', e => rodarMouse(e));
function rodarMouse(evento) {
  let proxPagina = paginaAtual;
  if (evento.wheelDelta > 0) {
    proxPagina === primeiraPagina ? true : proxPagina--
  } else {
    proxPagina === totalDePaginas ? true : proxPagina++
  }
  rolarPagina(proxPagina);
  paginaAtual = proxPagina
}

//Rolar pagina ao clicar nos botões

function rolarPagina(proxPagina) {
  switch (proxPagina) {
    case 0:
      valorTranslate = '0';
      break;
    case 1:
      valorTranslate = '-100vh';
      break;
    case 2:
      valorTranslate = '-200vh';
      break;
    default:
      valorTranslate = '0';

  }

  animacaoPagina(proxPagina);

  Array.from(paginas).forEach(elemento => {
    elemento.style.transform = `translateY(${valorTranslate})`;
  })
  paginaAtual = proxPagina;
}

//Alterar aspecto do indicador da pagina atual
const svgPaginas = document.getElementsByClassName('svgPagina');

function animacaoPagina(proxPagina) {
  svgPaginas[paginaAtual].style.width = '40';
  svgPaginas[proxPagina].style.width = '65';
}