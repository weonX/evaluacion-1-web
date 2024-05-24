function obtenerFarmacias() {
  fetch('https://midas.minsal.cl/farmacia_v2/WS/getLocalesTurnos.php')
    .then(response => response.json())
    .then(data => {
      console.log('Datos de farmacias recibidos:', data);
      mostrarFarmacias(data);
    })
    .catch(error => {
      console.error('Error al obtener las farmacias:', error);
    });
}

function mostrarFarmacias(farmacias) {
  const farmaciasCarousel = document.getElementById('farmaciasCarousel');
  const farmaciasList = document.createElement('ul');
  farmaciasList.classList.add('farmacias-list');

  farmacias.forEach(farmacia => {
    const itemFarmacia = document.createElement('li');
    itemFarmacia.textContent = `${farmacia.local_nombre} - ${farmacia.local_direccion}`;
    farmaciasList.appendChild(itemFarmacia);
  });

  farmaciasCarousel.appendChild(farmaciasList);

  // Configurar el carrusel
  const farmaciasItems = farmaciasCarousel.querySelectorAll('.farmacias-list > li');
  const numItems = farmaciasItems.length;
  const itemWidth = farmaciasItems[0].offsetWidth;
  const carouselWidth = numItems * itemWidth;

  farmaciasList.style.width = `${carouselWidth}px`;

  let currentIndex = 0;
  setInterval(() => {
    farmaciasList.style.transition = 'transform 0.5s ease-in-out';
    currentIndex = (currentIndex + 1) % numItems;
    farmaciasList.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  }, 3000); // Cambia de farmacia cada 3 segundos
}

window.onload = obtenerFarmacias;