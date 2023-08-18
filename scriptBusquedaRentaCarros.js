const data = [
    {
      "Destino": "Miami"
    },
    {
      "Destino": "Los Angeles"
    },
    {
      "Destino": "Orlando"
    },
    {
      "Destino": "New York"
    },
    {
      
      "Destino": "San Francisco"
      
    }
  ];
  

  const destinoSelect = document.getElementById("destino");
  const destinoDatalist = document.getElementById("destino-list");
  
  data.forEach(carro => {
  
    const destinoOption = document.createElement("option");
    destinoOption.value = carro.Destino;
    destinoDatalist.appendChild(destinoOption);
  });
  
  const buscarButton = document.querySelector(".select-button");
  
  buscarButton.addEventListener("click", () => {
    const destino = destinoSelect.value;
    const fechaInicio = document.getElementById("fecha-inicio").value;
    const fechaFin = document.getElementById("fecha-fin").value;
    
    const urlAPI = `https://localhost:7043/CarroControlador/BusquedaCarro?destino=${destino}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
  
  
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
        encabezadoID.textContent = 'ID Carro';
        encabezados.appendChild(encabezadoID);
  
        let encabezadoOrigen = document.createElement('th');
        encabezadoOrigen.textContent = 'Marca';
        encabezados.appendChild(encabezadoOrigen);
  
        let encabezadoDestino = document.createElement('th');
        encabezadoDestino.textContent = 'Modelo';
        encabezados.appendChild(encabezadoDestino);
  
        let encabezadoano = document.createElement('th');
        encabezadoano.textContent = 'Año';
        encabezados.appendChild(encabezadoano);

        let encabezadoTipo = document.createElement('th');
        encabezadoTipo.textContent = 'Tipo';
        encabezados.appendChild(encabezadoTipo);

        let encabezadoCapacidad = document.createElement('th');
        encabezadoCapacidad.textContent = 'Capacidad de pasajeros';
        encabezados.appendChild(encabezadoCapacidad);

        let encabezadoTransmision = document.createElement('th');
        encabezadoTransmision.textContent = 'Transmision';
        encabezados.appendChild(encabezadoTransmision);

        let encabezadoprecioPorDia = document.createElement('th');
        encabezadoprecioPorDia.textContent = 'Precio por dia';
        encabezados.appendChild(encabezadoprecioPorDia);

        let encabezadoubicacion = document.createElement('th');
        encabezadoubicacion.textContent = 'Ubicacion';
        encabezados.appendChild(encabezadoubicacion);
  
        tabla.appendChild(encabezados);
        
  
        // Iterar sobre los objetos del array de datos
        data.forEach(carros => {
          // Crear una nueva fila de tabla
          let fila = document.createElement('tr');
  
          // Crear las celdas de la fila con los datos del vuelo
          let idCelda = document.createElement('td');
          idCelda.textContent = carros.carroId;
          fila.appendChild(idCelda);
  
          let origenCelda = document.createElement('td');
          origenCelda.textContent = carros.marca;
          fila.appendChild(origenCelda);
  
          let destinoCelda = document.createElement('td');
          destinoCelda.textContent = carros.modelo;
          fila.appendChild(destinoCelda);
  
          let fechaSalidaCelda = document.createElement('td');
          fechaSalidaCelda.textContent = carros.anio;
          fila.appendChild(fechaSalidaCelda);

          let tipoCelda = document.createElement('td');
          tipoCelda.textContent = carros.tipo;
          fila.appendChild(tipoCelda);

          let CapacidadCelda = document.createElement('td');
          CapacidadCelda.textContent = carros.capacidadPasajeros;
          fila.appendChild(CapacidadCelda);

          let TransmisionCelda = document.createElement('td');
          TransmisionCelda.textContent = carros.transmision;
          fila.appendChild(TransmisionCelda);

          let PrecioCelda = document.createElement('td');
          PrecioCelda.textContent = carros.precioPorDia;
          fila.appendChild(PrecioCelda);

          let ubicacionCelda = document.createElement('td');
          ubicacionCelda.textContent = carros.ubicacion;
          fila.appendChild(ubicacionCelda);

          // Agregar la fila a la tabla
          tabla.appendChild(fila);
        });
        
        const reservarButton = document.getElementById("reservar-button");
        reservarButton.classList.remove("hidden");
  
        console.log(data);
      })
      .catch(error => console.log(error));
  });
  