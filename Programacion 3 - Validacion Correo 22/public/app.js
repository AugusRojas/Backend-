let boton = document.querySelector(".button")

boton.addEventListener("click", (event) => {
    event.preventDefault()

    let nombre = document.querySelector(".nombre").value
    let apellido = document.querySelector(".apellido").value
    let correo = document.querySelector("#correo").value
    let telefono = document.querySelector(".telefono").value
    let fecha = document.querySelector(".fecha").value
    let hora = document.querySelector(".hora").value
    let cantidad = document.querySelector(".cantidad").value

    let datos = { nombre, apellido, correo, telefono, fecha, hora, cantidad }

    fetch("http://localhost:3000/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => console.log(`datos en consola: ${JSON.stringify(data)}`))
    .catch(error => console.error('Error:', error))
})
