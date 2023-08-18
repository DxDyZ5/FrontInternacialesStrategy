const data = [
    {
      "Ubicacion": "Playa del Sol, Isla de la Fantasia"
    }
  ];
  

  const destinoSelect = document.getElementById("destino");
  const destinoDatalist = document.getElementById("destino-list");
  
  data.forEach(hotel => {
  
    const destinoOption = document.createElement("option");
    destinoOption.value = hotel.Ubicacion;
    destinoDatalist.appendChild(destinoOption);
  });
  
  const buscarButton = document.querySelector(".select-button");
  
  buscarButton.addEventListener("click", () => {
    const destino = destinoSelect.value;
    const fechaSalida = document.getElementById("fecha-entrada").value;
    const fechaRegreso = document.getElementById("fecha-salida").value;
    
    const urlAPI = `https://localhost:7043/HotelControlador/BusquedaHotel?destino=${destino}&FechaSalida=${fechaSalida}&FechaRegreso=${fechaRegreso}`;
  
  
    fetch(urlAPI)
      .then(response =>{
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
        encabezadoID.textContent = 'ID Hotel';
        encabezados.appendChild(encabezadoID);
  
        let encabezadoOrigen = document.createElement('th');
        encabezadoOrigen.textContent = 'Nombre';
        encabezados.appendChild(encabezadoOrigen);
  
        let encabezadoDestino = document.createElement('th');
        encabezadoDestino.textContent = 'Ubicacion';
        encabezados.appendChild(encabezadoDestino);
  
        let encabezadoFechaSalida = document.createElement('th');
        encabezadoFechaSalida.textContent = 'Disponibilidad';
        encabezados.appendChild(encabezadoFechaSalida);
  
        tabla.appendChild(encabezados);
        
  
        // Iterar sobre los objetos del array de datos
        data.forEach(hoteles => {
          // Crear una nueva fila de tabla
          let fila = document.createElement('tr');
  
          // Crear las celdas de la fila con los datos del vuelo
          let idCelda = document.createElement('td');
          idCelda.textContent = hoteles.iDhotel;
          fila.appendChild(idCelda);
  
          let origenCelda = document.createElement('td');
          origenCelda.textContent = hoteles.nombre;
          fila.appendChild(origenCelda);
  
          let destinoCelda = document.createElement('td');
          destinoCelda.textContent = hoteles.ubicacion;
          fila.appendChild(destinoCelda);
  
          let fechaSalidaCelda = document.createElement('td');
          fechaSalidaCelda.textContent = hoteles.disponibilidad;
          fila.appendChild(fechaSalidaCelda);
  
          // Agregar la fila a la tabla
          tabla.appendChild(fila);
        });
        
        const reservarButton = document.getElementById("reservar-button");
        reservarButton.classList.remove("hidden");
  
        console.log(data);
      })
      .catch(error => console.log(error));
  });
  