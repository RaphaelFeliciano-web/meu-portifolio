/* LÓGICA DO MENU HAMBÚRGUER */
const btnMenu = document.querySelector('.btn-menu-hamburguer');
const menu = document.querySelector('.cabecalho');
const body = document.querySelector('body');

btnMenu.addEventListener('click', () => {
    menu.classList.toggle('menu-aberto');
    body.classList.toggle('menu-aberto');

    const menuAberto = menu.classList.contains('menu-aberto');
    btnMenu.setAttribute('aria-expanded', menuAberto);
    btnMenu.setAttribute('aria-label', menuAberto ? 'Fechar menu' : 'Abrir menu');
});

// Fecha o menu ao clicar em um item do menu ou fora dele
document.addEventListener("click", (event) => {
	const target = event.target;
	const isClickOnMenuButton = btnMenu.contains(target);
	const isClickInsideMenu = menu.contains(target);
	const submenuTrigger = target.closest(".submenu-trigger");
	const openSubmenu = document.querySelector(".has-submenu.submenu-aberto");

	// 1. Lógica para abrir/fechar o submenu ao clicar no gatilho
	if (submenuTrigger) {
		submenuTrigger.closest(".has-submenu").classList.toggle("submenu-aberto");
		return; // Interrompe a execução para não fechar o menu imediatamente
	}

	// 2. Lógica para fechar o submenu se ele estiver aberto e o clique for fora dele
	if (openSubmenu && !openSubmenu.contains(target)) {
		openSubmenu.classList.remove("submenu-aberto");
	}

	// 3. Lógica para fechar o menu mobile
	const isMenuOpen = menu.classList.contains("menu-aberto");
	if (isMenuOpen) {
		// Fecha se o clique for fora do menu e do botão que o abre
		if (!isClickInsideMenu && !isClickOnMenuButton) {
			btnMenu.click();
		} else if (target.tagName === 'A' && !target.classList.contains('submenu-trigger')) {
			// Fecha se clicar em qualquer link que não seja o gatilho do submenu
			btnMenu.click();
		}
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

/* LÓGICA DO BOTÃO VOLTAR AO TOPO */
let lastScrollY = window.scrollY;
const btnVoltarTopo = document.querySelector('.btn-voltar-topo');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Mostra o botão após rolar uma certa altura (ex: 400px)
    if (currentScrollY > 400) {
        btnVoltarTopo.classList.add('visivel');
    } else {
        btnVoltarTopo.classList.remove('visivel');
    }

    // Lógica para ocultar/mostrar menu no scroll (apenas em desktop)
    if (window.innerWidth > 1024) {
        if (currentScrollY > lastScrollY && currentScrollY > 150) {
            menu.classList.add('menu-oculto');
        } else {
            menu.classList.remove('menu-oculto');
        }
    }
    lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
});