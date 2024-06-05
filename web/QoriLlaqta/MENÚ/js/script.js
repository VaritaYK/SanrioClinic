document.addEventListener('DOMContentLoaded', function() {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const navbar = document.querySelector('.navbar');

  // Agregar evento clic al botón del menú hamburguesa
  hamburgerMenu.addEventListener('click', function() {
    // Alternar clase 'active' para mostrar u ocultar el menú
    navbar.classList.toggle('open');
    // Alternar clase 'active' para animar el icono del menú
    hamburgerMenu.classList.toggle('active');
  });

  // Cerrar el menú cuando se hace clic en cualquier parte dentro del menú
  navbar.addEventListener('click', function(event) {
    // Si el clic ocurre dentro del menú y no en el botón hamburguesa
    if (event.target !== hamburgerMenu && navbar.classList.contains('open')) {
      // Cerrar el menú
      navbar.classList.remove('open');
      hamburgerMenu.classList.remove('active');
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel');
  let currentIndex = 0;

  function updateCarousel() {
      const profiles = document.querySelectorAll('.doctor-profile');
      currentIndex = (currentIndex + 1) % profiles.length;
      const offset = -currentIndex * 100 / profiles.length;
      carousel.style.transform = `translateX(${offset}%)`;
  }

  setInterval(updateCarousel, 3000); // Cambia cada 3 segundos
});
