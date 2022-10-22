import { projetos } from "./assets/texts/Projetos.js"

projetos.forEach((projeto, key) => {
  criarCaixaAno(projeto.ano);
  criarProjeto(key, projeto.imgSrc, projeto.imgAltPt, projeto.href, projeto.titulo, projeto.descSimplesPt, projeto.descCompletaPt);
});

function criarCaixaAno(ano) {
  if (!document.querySelector(`#ano__${ano}`)) {
    const caixaAno = document.createElement("h4");
    caixaAno.id = `ano__${ano}`;
    caixaAno.className = "caixaAno";
    caixaAno.innerText = ano;
    document.querySelector(".timelineGerada").appendChild(caixaAno);
  }
}

//Gerar HTML dos projetos
function criarProjeto(key, imgSrc, imgAlt, href, titulo, descSimples, descCompleta) {
  const containerProjeto = document.createElement("div");
  const projeto = document.createElement("article");
  const imagem = document.createElement("img");
  const texto = document.createElement("div");
  const ancora = document.createElement("a");
  const tituloElement = document.createElement("h5");
  const divisoria = document.createElement("hr");
  const descSimplesElement = document.createElement("p");
  const descCompletaElement = document.createElement("p");
  const seta = document.createElement("hr");

  containerProjeto.className = "containerProjeto";
  projeto.className = "projeto projeto__animacoes";

  imagem.className = "projeto__imagem";
  imagem.id = `projeto__imagem__${key}`;
  imagem.src = imgSrc;
  imagem.alt = imgAlt;

  texto.className = "projeto__texto";

  ancora.className = "projeto__ancora";
  ancora.href = href;
  ancora.target = "_blank";

  tituloElement.innerText = titulo;
  divisoria.className = "texto__divisoria";

  descSimplesElement.className = "descSimples";
  descSimplesElement.id = `descSimples__${key}`;
  descSimplesElement.innerText = descSimples;
  descSimplesElement.style.display = "block";

  descCompletaElement.className = "descCompleta";
  descCompletaElement.id = `descCompleta__${key}`;
  descCompletaElement.innerText = descCompleta;
  descCompletaElement.style.display = "none";

  seta.className = "seta";

  ancora.appendChild(tituloElement);
  ancora.appendChild(divisoria);
  ancora.appendChild(descSimplesElement);
  ancora.appendChild(descCompletaElement);
  texto.appendChild(ancora);
  projeto.appendChild(imagem);
  projeto.appendChild(texto);
  containerProjeto.appendChild(projeto);
  containerProjeto.appendChild(seta);

  document.querySelector(".timelineGerada").appendChild(containerProjeto);
}

function carregarTextosProjetos(lingua) {
  if (lingua === "Pt") {
    projetos.forEach((projeto, key) => {
      document.querySelector(`#projeto__imagem__${key}`).alt = projeto.imgAltPt;
      document.querySelector(`#descSimples__${key}`).innerText = projeto.descSimplesPt;
      document.querySelector(`#descCompleta__${key}`).innerText = projeto.descCompletaPt;
    });
  } else {
    projetos.forEach((projeto, key) => {
      document.querySelector(`#projeto__imagem__${key}`).alt = projeto.imgAltEn;
      document.querySelector(`#descSimples__${key}`).innerText = projeto.descSimplesEn;
      document.querySelector(`#descCompleta__${key}`).innerText = projeto.descCompletaEn;
    });
  }
}

//Mostrar/esconder descrição detalhada ao passar o mouse em cima do projeto
document.querySelectorAll('.projeto__ancora').forEach(elemento => {
  elemento.addEventListener('mouseover', () => mostrarDescDetalhada(elemento));
  elemento.addEventListener('mouseleave', () => esconderDescDetalhada(elemento));
})

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

export { carregarTextosProjetos };
