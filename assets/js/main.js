// Scroll suave ao clicar nas bolinhas
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetSection = document.querySelector(this.getAttribute('href'));
        
        // Calcula a altura de deslocamento para telas pequenas
        let offset = 0;
        if (window.innerWidth <= 1024) {
            offset = 150;  // Ajuste esse valor para corresponder à altura do cabeçalho em telas menores
        }

        if (window.innerWidth <= 768) {
            offset = 220;  // Ajuste esse valor para corresponder à altura do cabeçalho em telas menores
        }

        const topPosition = targetSection.offsetTop - offset;

        window.scrollTo({
            top: topPosition,
            behavior: 'smooth'
        });
    });
});


// Destacar a bolinha ativa com base na rolagem da página
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const navDots = document.querySelectorAll('.nav-dots ul li a');

    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('href') === `#${current}`) {
                dot.classList.add('active');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.nav-dots ul li a');

    links.forEach(link => {
        link.addEventListener('click', function () {
            // Remover a classe 'active' de todos os links
            links.forEach(link => link.classList.remove('active'));
            // Adicionar a classe 'active' ao link clicado
            this.classList.add('active');
        });
    });

    // Adicionando a classe 'active' com base na seção visível
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top >= 0 && rect.top < window.innerHeight) {
                const id = section.getAttribute('id');
                links.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});

//! Texto Dinâmico

const dynamicSubtitle = document.getElementById('dynamic-subtitle');
const phrases = [
    "Desenvolvedor Front-End",
    "Estudante de Engenharia de Software",
    "Aluno do Projeto ONE",
];

let index = 0; // Índice da frase atual
let charIndex = 0; // Índice do caractere atual
let isDeleting = false; // Flag para verificar se está apagando
const typingSpeed = 100; // Velocidade de digitação
const deletingSpeed = 50; // Velocidade de apagar
const pauseTime = 1500; // Pausa após a frase completa

function typeEffect() {
    const currentPhrase = phrases[index];

    if (!isDeleting) {
        // Digitar o texto
        if (charIndex <= currentPhrase.length) {
            dynamicSubtitle.textContent = currentPhrase.substring(0, charIndex);
            charIndex++;
            setTimeout(typeEffect, typingSpeed);
        } else {
            // Pausa após terminar de digitar a frase
            isDeleting = true;
            setTimeout(typeEffect, pauseTime);
        }
    } else {
        // Apagar o texto
        if (charIndex > 0) {
            dynamicSubtitle.textContent = currentPhrase.substring(0, charIndex);
            charIndex--;
            setTimeout(typeEffect, deletingSpeed);
        } else {
            // Passar para a próxima frase
            isDeleting = false;
            index = (index + 1) % phrases.length;
            setTimeout(typeEffect, typingSpeed);
        }
    }
}

document.addEventListener("DOMContentLoaded", typeEffect);
