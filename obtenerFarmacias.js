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
  const farmaciasList = document.createElement('div');
  farmaciasList.classList.add('farmacias-list');

  farmacias.forEach(farmacia => {
    const farmaciasItem = document.createElement('div');
    farmaciasItem.classList.add('farmacias-item');
    farmaciasItem.innerHTML = `<h3>${farmacia.local_nombre}</h3>
                               <p>${farmacia.local_direccion}</p>`;
    farmaciasList.appendChild(farmaciasItem);
  });

  farmaciasCarousel.appendChild(farmaciasList);

  // Configurar el carrusel
  const numItems = farmacias.length;
  const itemWidth = farmaciasList.firstElementChild.offsetWidth;
  farmaciasList.style.width = `${numItems * itemWidth}px`;
  let currentIndex = 0;

  setInterval(() => {
    currentIndex = (currentIndex + 1) % numItems;
    farmaciasList.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  }, 3000); // Cambia de farmacia cada 3 segundos
}

window.onload = obtenerFarmacias;


$(document).ready(function() {
  // Función para animar el elemento al hacer clic en él
  $('#elemento').click(function() {
    $(this).animate({ fontSize: '24px', opacity: '0.5' }, 'slow');
  });
});