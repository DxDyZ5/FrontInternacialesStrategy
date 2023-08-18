const data = [
  {
    
    "Origen": "Rio de Janeiro",
    "Destino": "Nueva York"
  },
  {
    
    "Origen": "Roma",
    "Destino": "Dubai"
  },
  {
    
    "Origen": "Londres",
    "Destino": "Tokio"
  },
  {
    
    "Origen": "Paris",
    "Destino": "Ciudad de Mexico"
  },
  {
    
    "Origen": "Moscu",
    "Destino": "Sidney"
    
  }
];

const origenSelect = document.getElementById("origen");
const origenDatalist = document.getElementById("origen-list");
const destinoSelect = document.getElementById("destino");
const destinoDatalist = document.getElementById("destino-list");


data.forEach(vuelo => {
  const origenOption = document.createElement("option");
  origenOption.value = vuelo.Origen;
  origenDatalist.appendChild(origenOption);

  const destinoOption = document.createElement("option");
  destinoOption.value = vuelo.Destino;
  destinoDatalist.appendChild(destinoOption);
});

const buscarButton = document.querySelector(".select-button");

buscarButton.addEventListener("click", () => {
  const origen = origenSelect.value;
  const destino = destinoSelect.value;
  const fechaSalida = document.getElementById("fecha-salida").value;
  const fechaRegreso = document.getElementById("fecha-regreso").value;
  
  const urlAPI = `https://localhost:7043/VueloControlador/BusquedaVuelo?origen=${origen}&destino=${destino}&FechaSalida=${fechaSalida}&FechaRegreso=${fechaRegreso}`;


  fetch(urlAPI)
    .then(response => {
      if(!response.ok){
        alert("error en la solicitud: " + response.status)
      }
      return response.json();
    })
    .then(data => {
      let tabla = document.getElementById('Tabla');
      tabla.innerHTML = '';

      let encabezados = document.createElement('tr');

      let encabezadoID = document.createElement('th');
      encabezadoID.textContent = 'ID Vuelo';
      encabezados.appendChild(encabezadoID);

      let encabezadoOrigen = document.createElement('th');
      encabezadoOrigen.textContent = 'Origen';
      encabezados.appendChild(encabezadoOrigen);

      let encabezadoDestino = document.createElement('th');
      encabezadoDestino.textContent = 'Destino';
      encabezados.appendChild(encabezadoDestino);

      let encabezadoFechaSalida = document.createElement('th');
      encabezadoFechaSalida.textContent = 'Fecha de Salida';
      encabezados.appendChild(encabezadoFechaSalida);

      let encabezadoFechaRegreso = document.createElement('th');
      encabezadoFechaRegreso.textContent = 'Fecha de Regreso';
      encabezados.appendChild(encabezadoFechaRegreso);

      let encabezadoAsientos = document.createElement('th');
      encabezadoAsientos.textContent = 'Asientos Disponibles';
      encabezados.appendChild(encabezadoAsientos);

      let encabezadoPrecio = document.createElement('th');
      encabezadoPrecio.textContent = 'Precio';
      encabezados.appendChild(encabezadoPrecio);

      tabla.appendChild(encabezados);

      // Iterar sobre los objetos del array de datos
      data.forEach(vuelo => {
        // Crear una nueva fila de tabla
        let fila = document.createElement('tr');

        // Crear las celdas de la fila con los datos del vuelo
        let idCelda = document.createElement('td');
        idCelda.textContent = vuelo.iDvuelo;
        fila.appendChild(idCelda);

        let origenCelda = document.createElement('td');
        origenCelda.textContent = vuelo.origen;
        fila.appendChild(origenCelda);

        let destinoCelda = document.createElement('td');
        destinoCelda.textContent = vuelo.destino;
        fila.appendChild(destinoCelda);

        let fechaSalidaCelda = document.createElement('td');
        fechaSalidaCelda.textContent = vuelo.fechaSalida;
        fila.appendChild(fechaSalidaCelda);

        let fechaRegresoCelda = document.createElement('td');
        fechaRegresoCelda.textContent = vuelo.fechaRegreso;
        fila.appendChild(fechaRegresoCelda);

        let asientosCelda = document.createElement('td');
        asientosCelda.textContent = vuelo.asientosDisponibles;
        fila.appendChild(asientosCelda);

        let precioCelda = document.createElement('td');
        precioCelda.textContent = vuelo.precio;
        fila.appendChild(precioCelda);

        // Agregar la fila a la tabla
        tabla.appendChild(fila);
      });

      const reservarButton = document.getElementById("reservar-button");
      reservarButton.classList.remove("hidden");

      console.log(data);
    })
    .catch(error => console.log(error));
});
