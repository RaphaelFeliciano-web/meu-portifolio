/* LÓGICA DO MENU HAMBÚRGUER */
const btnMenu = document.querySelector('.btn-menu-hamburguer');
const menu = document.querySelector('.cabecalho');
const body = document.querySelector('body');

btnMenu.addEventListener('click', () => {
    menu.classList.toggle('menu-aberto');
    body.classList.toggle('menu-aberto');
});

// Fecha o menu ao clicar em um item do menu ou fora dele
body.addEventListener('click', (event) => {
    // Verifica se o clique foi fora do menu e do botão
    if (menu.classList.contains('menu-aberto') && !menu.contains(event.target) && !btnMenu.contains(event.target)) {
        menu.classList.remove('menu-aberto');
        body.classList.remove('menu-aberto');
    }
});

/* LÓGICA DA ANIMAÇÃO DA LINHA DO TEMPO */
const itensDaLinhaDoTempo = document.querySelectorAll('.timeline-item');

const observadorLinhaDoTempo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observadorLinhaDoTempo.unobserve(entry.target); // Para de observar o elemento depois que ele já apareceu.
        }
    });
}, {
    threshold: 0.2 // A animação começa quando 20% do elemento estiver visível
});

itensDaLinhaDoTempo.forEach((item, index) => {
    // Adiciona um pequeno atraso escalonado para um efeito mais suave
    const delay = index * 150;
    item.style.transitionDelay = `${delay}ms`;
    
    observadorLinhaDoTempo.observe(item);
});
/* LÓGICA DO DOSSIÊ INTERATIVO (EXPANDIR/RECOLHER) */
const itensExpansiveis = document.querySelectorAll('.expandable .timeline-header');

itensExpansiveis.forEach(item => {
    item.addEventListener('click', () => {
        const itemPai = item.closest('.expandable');

        // Fecha outros itens que possam estar abertos para manter a interface limpa
        document.querySelectorAll('.expandable.expanded').forEach(itemAberto => {
            if (itemAberto !== itemPai) {
                itemAberto.classList.remove('expanded');
            }
        });

        // Abre ou fecha o item clicado
        itemPai.classList.toggle('expanded');
    });
});