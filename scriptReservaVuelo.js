document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", handleSubmit);
});

function handleSubmit(event) {
  event.preventDefault();

  const idVuelo = document.querySelector('input[name="IdVuelo"]').value;
  const FormatoInfo = document.querySelector('select[name="formato"').value;
  const nombre = document.querySelector('input[name="Nombre"]').value;
  const apellido = document.querySelector('input[name="Apellido"]').value;
  const edad = document.querySelector('input[name="Edad"]').value;
  const numeroDePasaporte = document.querySelector('input[name="NumeroDePasaporte"]').value;

  if (idVuelo > 5) {
    alert("No existe dicho hotel");
    return; // Detener la ejecución del código si el vuelo no existe
  }
  else if (idVuelo < 1) {
    alert("No existe dicho hotel");
    return; // Detener la ejecución del código si el vuelo no existe
  }

  const data = {

      nombre: nombre,
      apellido: apellido,
      edad: edad,
      numeroPasaporte: numeroDePasaporte
  };

  const url = `https://localhost:7043/VueloControlador/ReservaVuelo?idVuelo=${idVuelo}&FormatoInfo=${FormatoInfo}`;
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
    alert("Reserva exitosa, revisa descargas");
    console.log(data);
  })
  .catch(error => {
    alert("No se pudo completar la reserva: " + error.message);
    console.error(error);
  });

}
