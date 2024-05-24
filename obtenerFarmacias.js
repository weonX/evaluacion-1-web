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
  const listaFarmacias = document.createElement('ul');

  farmacias.forEach(farmacia => {
    const itemFarmacia = document.createElement('li');
    itemFarmacia.textContent = `${farmacia.local_nombre} - ${farmacia.local_direccion}`;
    listaFarmacias.appendChild(itemFarmacia);
  });

  farmaciasCarousel.appendChild(listaFarmacias);

  // Configurar el carrusel
  const farmaciasList = farmaciasCarousel.querySelector('ul');
  const farmaciasItems = farmaciasCarousel.querySelectorAll('li');
  const numItems = farmaciasItems.length;
  const itemWidth = farmaciasItems[0].offsetWidth;

  farmaciasList.style.width = `${numItems * itemWidth}px`;

  let currentIndex = 0;
  setInterval(() => {
    currentIndex = (currentIndex + 1) % numItems;
    farmaciasList.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  }, 3000); // Cambia de farmacia cada 3 segundos
}

window.onload = obtenerFarmacias;