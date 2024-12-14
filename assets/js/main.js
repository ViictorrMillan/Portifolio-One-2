// Scroll suave ao clicar nos links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Previne o comportamento padrão do link

        // Seleciona a seção alvo usando o ID
        const targetId = this.getAttribute('href'); // Mantém o "#" do href
        const targetSection = document.querySelector(targetId); // Seleciona pela ID

        if (targetSection) { // Verifica se a seção existe
            // Encontra o título da seção
            const sectionTitle = targetSection.querySelector('.section-title');
            const scrollTarget = sectionTitle ? sectionTitle : targetSection; // Usa o título se disponível

            // Calcula a altura do cabeçalho
            const header = document.querySelector('header'); // Altere isso para o seletor do seu cabeçalho
            const headerHeight = header ? header.offsetHeight : 0; // Verifica se o cabeçalho existe

            // Define deslocamento baseado no tamanho da tela
            const isMobile = window.innerWidth <= 480; // Definição para dispositivos móveis
            let offset = isMobile ? 20 : 50; // Deslocamento padrão

            // Ajuste personalizado para as seções específicas
            if (targetId === "#resume" || targetId === "#about") {
                if (isMobile) {
                    offset += 50; // Deslocamento maior em telas menores
                } else if (targetId === "#resume") {
                    // Centraliza o conteúdo da seção 'resume' em telas maiores
                    const sectionHeight = targetSection.offsetHeight;
                    const viewportHeight = window.innerHeight;
                    offset = -(viewportHeight / 2 - sectionHeight / 2 - headerHeight);
                } else {
                    offset += 70; // Ajuste extra para 'about' em telas maiores
                }
            }

            // Calcula a posição ajustada
            const topPosition = scrollTarget.offsetTop - headerHeight - offset;

            // Faz a rolagem suave para a posição calculada
            window.scrollTo({
                top: topPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Destaque da seção atual
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const navDots = document.querySelectorAll('.nav-dots ul li a');

    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTitle = section.querySelector('.section-title');
            const sectionTop = sectionTitle ? sectionTitle.offsetTop : section.offsetTop;
            const sectionHeight = section.clientHeight;

            // Ajuste para considerar a altura do cabeçalho e centralização
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 0;

            // Define deslocamento dinâmico
            const isMobile = window.innerWidth <= 480;
            let offset = isMobile ? 20 : 50;

            // Ajuste personalizado para as seções específicas
            if (current === "resume" || current === "about") {
                if (isMobile) {
                    offset += 50;
                } else {
                    offset += 70; // Ajuste extra para telas maiores
                }
            }

            if (window.scrollY >= sectionTop - sectionHeight / 3 - headerHeight - offset) {
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

