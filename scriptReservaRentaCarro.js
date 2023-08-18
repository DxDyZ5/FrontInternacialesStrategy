document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    form.addEventListener("submit", handleSubmit);
  });
  
  function handleSubmit(event) {
    event.preventDefault();
  
    const idCarro = document.querySelector('input[name="idCarro"]').value;
    const FormatoInfo = document.querySelector('select[name="formato"').value;
    const nombre = document.querySelector('input[name="Nombre"]').value;
    const apellido = document.querySelector('input[name="Apellido"]').value;
    const LicenciadeConducir = document.querySelector('input[name="NumeroLicenciaConducir"]').value;


    if (idCarro > 5) {
      alert("No existe dicho carro");
      return; // Detener la ejecución del código si el vuelo no existe
    }
    else if (idCarro < 1) {
      alert("No existe dicho carro");
      return; // Detener la ejecución del código si el vuelo no existe
    }
  
    const data = {
        nombre: nombre,
        apellido: apellido,
        numeroLicenciaConducir: LicenciadeConducir,
    };
  
    const url = `https://localhost:7043/CarroControlador/ReservaCarro?idCarro=${idCarro}&FormatoInfo=${FormatoInfo}`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
  
    fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.status);
      }
      return response.json();
    })
    .then(data => {
      alert("Reserva exitosa, revise descargas");
      console.log(data);
    })
    .catch(error => {
      alert("No se pudo completar la reserva: " + error.message);
      console.error(error);
    });
  
  }
  