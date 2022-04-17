//Rolar pagina com a roda do mouse
const paginas = document.getElementsByClassName('pagina');
let paginaAtual = 0;
let primeiraPagina = 0;
let totalDePaginas = paginas.length - 1;
const timeline = document.getElementById('timeline')

window.addEventListener('mousewheel', e => rodarMouse(e));
function rodarMouse(evento) {

  if(timeline.scrollTop === 0){
    let proxPagina = paginaAtual;
    if (evento.wheelDelta > 0) {
      proxPagina === primeiraPagina ? true : proxPagina--
    } else {
      proxPagina === totalDePaginas ? true : proxPagina++
    }
    rolarPagina(proxPagina);
    paginaAtual = proxPagina
  }

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
  timeline.scrollTop = 0
  animacaoPagina(proxPagina);
  
  Array.from(paginas).forEach(elemento => {
    elemento.style.transform = `translateY(${valorTranslate})`;
  });
  paginaAtual = proxPagina;
}

//Alterar aspecto do indicador da pagina atual
const svgPaginas = document.getElementsByClassName('svgPagina');

function animacaoPagina(proxPagina) {
  svgPaginas[paginaAtual].style.width = '40';
  svgPaginas[proxPagina].style.width = '65';
}

//Mostrar/esconder descrição detalhada ao passar o mouse em cima do projeto
function mostrarDescDetalhada(elemento) {
  Array.from(elemento.children).forEach(filho => {
    if (filho.className === 'descCompleta') {
      filho.style = 'display: block';
    }
    if (filho.className === 'descSimples') {
      filho.style = 'display: none';
    }
  })
}

function esconderDescDetalhada(elemento) {
  Array.from(elemento.children).forEach(filho => {
    if (filho.className === 'descCompleta') {
      filho.style = 'display: none';
    }
    if (filho.className === 'descSimples') {
      filho.style = 'display: block';
    }
  })
}

//Organizar projetos
window.onload = () => {
  const projetos = document.getElementsByClassName('containerProjeto');
  organizarProjetos(projetos);
};

function organizarProjetos(projetos) {
  Array.from(projetos).forEach((projeto, index) => {
    if (Boolean(index % 2)) {
      let classeAntiga = projeto.className;
      projeto.className = `${classeAntiga} esquerda`;
    }
  })
}