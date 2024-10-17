// Scroll suave ao clicar nas bolinhas
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
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

document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('.nav-dots ul li a');

  links.forEach(link => {
      link.addEventListener('click', function() {
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