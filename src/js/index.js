const btnAvancar = document.querySelector('.btn-avancar');
const btnVoltar = document.querySelector('.btn-voltar');
const projetos = document.querySelectorAll('.projeto');
const menuLateralItens = document.querySelectorAll('.projetos-galeria-navegacao .item-projeto');
const body = document.getElementById('body');

let projetoAtual = 0;

function esconderProjetoSelecionado() {
  const projetoSelecionado = document.querySelector('.projeto.ativo');
  projetoSelecionado.classList.remove('ativo');
}

function mostrarProjeto() {
  projetos[projetoAtual].classList.add('ativo');
  mudarCorDeFundo(projetos[projetoAtual]);
}

function mudarCorDeFundo(projeto) {
    const corPrimaria = projeto.getAttribute('data-color-primary');
    const corSecundaria = projeto.getAttribute('data-color-secondary');
    if (corPrimaria && corSecundaria) {
        body.style.background = `linear-gradient(150deg, ${corPrimaria}, ${corSecundaria})`;
    }
}

function atualizarItemMenuLateral() {
  const itemSelecionado = document.querySelector('.projetos-galeria-navegacao .item-projeto.ativo');
  itemSelecionado.classList.remove('ativo');
  menuLateralItens[projetoAtual].classList.add('ativo');
}

function mostrarOuEsconderSetas() {
  const ehPrimeiroProjeto = projetoAtual === 0;
  if (ehPrimeiroProjeto) {
    btnVoltar.classList.add('esconder');
  } else {
    btnVoltar.classList.remove('esconder');
  }

  const ehUltimoProjeto = projetoAtual === projetos.length - 1;
  if (ehUltimoProjeto) {
    btnAvancar.classList.add('esconder');
  } else {
    btnAvancar.classList.remove('esconder');
  }
}

btnAvancar.addEventListener('click', function () {
  if (projetoAtual === projetos.length - 1) return;

  esconderProjetoSelecionado();
  projetoAtual++;
  mostrarProjeto();
  mostrarOuEsconderSetas();
  atualizarItemMenuLateral();
});

btnVoltar.addEventListener('click', function () {
  if (projetoAtual === 0) return;

  esconderProjetoSelecionado();
  projetoAtual--;
  mostrarProjeto();
  mostrarOuEsconderSetas();
  atualizarItemMenuLateral();
});

menuLateralItens.forEach((item, indice) => {
  item.addEventListener('click', () => {
    if (projetoAtual === indice) return;

    esconderProjetoSelecionado();
    projetoAtual = indice;
    mostrarProjeto();
    mostrarOuEsconderSetas();
    atualizarItemMenuLateral();
  });
});

window.addEventListener('load', () => {
  mudarCorDeFundo(projetos[projetoAtual]);
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            // Opcional: descomente a linha abaixo para re-animar toda vez que o usuário rolar para cima e para baixo
            // entry.target.classList.remove('show');
        }
    });
});

const elementosParaAnimar = document.querySelectorAll('.habilidades .habilidade');
elementosParaAnimar.forEach((element, index) => {
    element.style.setProperty('--delay', `${index * 150}ms`);
    observer.observe(element);
});