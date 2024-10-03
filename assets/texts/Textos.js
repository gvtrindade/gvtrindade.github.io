function contadorDeAnos() {
  const anoInicio = 2019;
  const anoAtual = new Date();
  return anoAtual.getFullYear() - anoInicio;
}

const textoPt = {
  inicio__texto__subtexto: "desenvolvedor web, cursando análise e desenvolvimento de sistemas.",
  descritivo__titulo: "Sobre Mim",
  descritivo__texto1: `${contadorDeAnos()} anos de experiência com Javascript. Atualmente trabalha como estagiário na Basis Tecnologia. Não consegue trabalhar sem música.`,
  descritivo__texto2: "Sites com design moderno e responsívo, PWAs e aplicações web.",
  descritivo__texto3: "Habilidades em React e Angular, com implementações de backend em Java e Python. Testes unitários, CI/CD, gerenciamento de bancos de dados",
  qualificacoes__titulo: "Qualificações",
  projetos__titulo: "Projetos",
  inicioTimeline: "Início"
}

const textoEn = {
  inicio__texto__subtexto: "web developer, studying for a system development and analysis degree.",
  descritivo__titulo: "About me",
  descritivo__texto1: `${contadorDeAnos()} years of experience with Javascript. Can't work without music.`,
  descritivo__texto2: "Websites with modern and responsive design, PWAs and web apps.",
  descritivo__texto3: "Mastering React and Angular, with backend implementations in Java and Python. Unit tests, CI/CD, database management",
  qualificacoes__titulo: "Skills",
  projetos__titulo: "Projects",
  inicioTimeline: "Begining"
}

export { textoPt, textoEn };