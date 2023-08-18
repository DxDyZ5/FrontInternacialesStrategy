const apiUrl = "https://localhost:7043/ClienteController/clienteobtener"; 

async function fetchClientes() {
    try {
        const response = await fetch(apiUrl);
        const clientes = await response.json();
        return clientes;
    } catch (error) {
        console.error("Error al obtener los clientes:", error);
        return [];
    }
}

function mostrarClientes(clientes) {
    const clientesContainer = document.getElementById("clientes-container");
    clientes.forEach((cliente) => {
        const clienteDiv = document.createElement("div");
        clienteDiv.className = "cliente";
        clienteDiv.innerHTML = `
            <h3>${cliente.nombre} ${cliente.apellido}</h3>
            <p>Edad: ${cliente.edad}</p>
            <p>Género: ${cliente.genero}</p>
            <p>Email: ${cliente.email}</p>
            <button class="suscribir-button">Suscribirse</button>
            <button class="cancelar-button">Cancelar sub</button>
        `;
        clientesContainer.appendChild(clienteDiv);

        const suscribirButton = clienteDiv.querySelector(".suscribir-button");
        suscribirButton.addEventListener("click", suscribirCliente);

        const cancelarButton = clienteDiv.querySelector(".cancelar-button");
        cancelarButton.addEventListener("click", cancelarSuscripcionCliente);
    });
}

async function init() {
    const clientes = await fetchClientes();
    mostrarClientes(clientes);
}

init();


async function suscribirCliente(event) {
    const clienteContainer = event.target.parentElement;
    const nombreElement = clienteContainer.querySelector("h3");
    const [nombre, apellido] = nombreElement.textContent.split(" ");
    const edad = clienteContainer.querySelector("p:nth-child(2)").textContent.replace("Edad: ", "");
    const genero = clienteContainer.querySelector("p:nth-child(3)").textContent.replace("Género: ", "");
    const email = clienteContainer.querySelector("p:nth-child(4)").textContent.replace("Email: ", "");

    const nuevoCliente = {
        Nombre: nombre,
        Apellido: apellido,
        Edad: parseInt(edad),
        Genero: genero,
        Email: email
    };
//Al enviar el correo dura un tiempo dele tiempo por favor
    try {
        const response = await fetch("https://localhost:7043/ClienteController/clienteagregar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoCliente)
        });

        if (response.ok) {      
            const data = await response.json();
            alert(data.message); 
        } else {
            const data = await response.json(); 
            alert(data.message);
        }
    } catch (error) {
        console.error("Error al suscribir al cliente:", error);
    }
}

// cancelar
//Al enviar el correo dura un tiempo dele tiempo por favor
async function cancelarSuscripcionCliente(event) {
    const clienteContainer = event.target.parentElement;
    const nombreElement = clienteContainer.querySelector("h3");
    const [nombre, apellido] = nombreElement.textContent.split(" ");
    const edad = clienteContainer.querySelector("p:nth-child(2)").textContent.replace("Edad: ", "");
    const genero = clienteContainer.querySelector("p:nth-child(3)").textContent.replace("Género: ", "");
    const email = clienteContainer.querySelector("p:nth-child(4)").textContent.replace("Email: ", "");

    const clienteCancelar = {
        Nombre: nombre,
        Apellido: apellido,
        Edad: parseInt(edad),
        Genero: genero,
        Email: email
    };

    try {
        const response = await fetch("https://localhost:7043/ClienteController/clientequitar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(clienteCancelar)
        });

        if (response.ok) {      
            const data = await response.json();
            alert(data.message); 
        } else {
            const data = await response.json(); 
            alert(data.message);
        }
    } catch (error) {
        console.error("Error al cancelar suscripción del cliente:", error);
    }
}