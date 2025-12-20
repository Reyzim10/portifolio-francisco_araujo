// ============================================
// NAVEGAÇÃO RESPONSIVA
// ============================================
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu mobile
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ============================================
// NAVEGAÇÃO ATIVA BASEADA NO SCROLL
// ============================================
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ============================================
// ANIMAÇÃO DE SCROLL SUAVE
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// ANIMAÇÃO DE ENTRADA DOS ELEMENTOS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Elementos para animar
const animatedElements = document.querySelectorAll(
    '.skill-category, .project-card, .education-item, .contact-card, .stat, .about-text'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================================
// NAVBAR TRANSPARENTE/SÓLIDA NO SCROLL
// ============================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        return;
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scroll para baixo
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scroll para cima
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    }

    lastScroll = currentScroll;
});

// ============================================
// EFEITO DE DIGITAÇÃO NO TÍTULO
// ============================================
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    // Iniciar animação após um pequeno delay
    setTimeout(typeWriter, 500);
}

// ============================================
// CONTADOR ANIMADO (SE NECESSÁRIO)
// ============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// ============================================
// BOTÃO VOLTAR AO TOPO
// ============================================
const createBackToTop = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.setAttribute('aria-label', 'Voltar ao topo');
    
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #00d9ff 0%, #7c3aed 100%);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 15px rgba(0, 217, 255, 0.3);
        transition: all 0.3s ease;
        z-index: 999;
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-5px)';
        button.style.boxShadow = '0 8px 25px rgba(0, 217, 255, 0.5)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 4px 15px rgba(0, 217, 255, 0.3)';
    });
};

createBackToTop();

// ============================================
// VALIDAÇÃO DE LINKS EXTERNOS
// ============================================
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.setAttribute('rel', 'noopener noreferrer');
});

// ============================================
// MODO ESCURO/CLARO (OPCIONAL - DESCOMENTE PARA USAR)
// ============================================
/*
const createThemeToggle = () => {
    const toggle = document.createElement('button');
    toggle.innerHTML = '<i class="fas fa-moon"></i>';
    toggle.className = 'theme-toggle';
    toggle.setAttribute('aria-label', 'Alternar tema');
    
    toggle.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--bg-card);
        color: var(--accent-primary);
        border: 2px solid var(--accent-primary);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        transition: all 0.3s ease;
        z-index: 999;
    `;
    
    document.body.appendChild(toggle);
    
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const icon = toggle.querySelector('i');
        
        if (document.body.classList.contains('light-theme')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    });
};

// Descomente a linha abaixo para ativar o toggle de tema
// createThemeToggle();
*/

// ============================================
// LOADING INICIAL
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// CONSOLE LOG PERSONALIZADO
// ============================================
console.log('%c🚀 Portfólio desenvolvido por Francisco Araújo', 'color: #00d9ff; font-size: 16px; font-weight: bold;');
console.log('%cInteressado em desenvolvimento web? Entre em contato!', 'color: #7c3aed; font-size: 14px;');
