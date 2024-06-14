import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import fs from 'fs'
import mysql from 'mysql'

const app = express()

app.use(cors())
app.use(express.json())

app.get("/data", (req, res) => {
    res.send("<h1>hola capo ya tenes alto servidor</h1>")
})

app.post("/data", async (req, res) => {
    let datosRecibidos = req.body
    console.log(datosRecibidos)

    const { nombre, apellido, correo, telefono, fecha, hora, cantidad } = req.body

    if (nombre !== "" && apellido !== "" && correo !== "" && telefono !== "" && fecha !== "" && hora !== "" && cantidad !== "") {

        const correoURL = encodeURIComponent(correo)
        const nombreURL = encodeURIComponent(nombre)
        const apellidoURL = encodeURIComponent(apellido)
        const telefonoURL = encodeURIComponent(telefono)
        const fechaURL = encodeURIComponent(fecha)
        const horaURL = encodeURIComponent(hora)
        const confirmationUrl = `http://localhost:3000/confirm/${correoURL}?nombre=${nombreURL}&apellido=${apellidoURL}&telefono=${telefonoURL}&fecha=${fechaURL}&hora=${horaURL}&cantidad=${cantidad}`

        try {
            // Guardar los datos en la base de datos
            const conexion = mysql.createConnection({
                host: "localhost",
                database: "reservacionesbar",
                user: "root",
                password: ""
            })

            conexion.connect((error) => {
                if (error) {
                    console.log('Error al conectar a la base de datos:', error)
                }

                console.log("Conexión Exitosa")

                const consulta = `INSERT INTO reservaciones (nombreReservacion, apellidoReservacion, mailReservacion, telefonoReservacion, fechaReservacion, horaReservacion, cantidadReservacion) VALUES ('${nombre}', '${apellido}', '${correo}', '${telefono}', '${fecha}', '${hora}', '${cantidad}')`

                conexion.query(consulta, (error) => {
                    if (error) {
                        console.error('Error al insertar la reservación:', error)
                        return res.send('Error al insertar la reservación')
                    }

                    conexion.end()

                    try {
                        EnviodeCorreo(correo, confirmationUrl) // Enviar el primer correo con la URL de confirmación
                        let mensaje = { me: "correo enviado" }
                        console.log(mensaje)
                        return res.json(mensaje)
                    }
                    catch (error) {
                        console.error("Error al enviar correo:", error)
                        return res.json({ me: "Error al enviar correo" })
                    }
                })
            })
        }

        catch (error) {
            console.error("Error en el proceso de reserva:", error)
            return res.send('Error en el proceso de reserva')
        }
    }

    else {
        let mensaje = { me: "Complete los campos para poder reservar" }
        console.log(mensaje)
        return res.json(mensaje)
    }
})

app.get('/confirm/:correoURL', async (req, res) => {
    const correoURLDeco = decodeURIComponent(req.params.correoURL)
    const { nombre, apellido, telefono, fecha, hora, cantidad } = req.query


    let datosRecuperados = {
        nombreReservacion: nombre,
        apellidoReservacion: apellido,
        mailReservacion: correoURLDeco,
        telefonoReservacion: telefono,
        fechaReservacion: fecha,
        horaReservacion: hora,
        cantidadReservacion: cantidad
    }

    await EnviodeCorreoConfirmacion(correoURLDeco, datosRecuperados)
    res.redirect('https://666c75dca47bf9e4e65ef28d--spontaneous-lily-b918cd.netlify.app/')

})

async function EnviodeCorreo(correo, confirmacionUrl) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: "saltodecuenta2023@gmail.com",
            pass: "ylmw dbry mbom sghc",
        }
    })

    let estructuraHTML = fs.readFileSync("server/correo.html", 'utf-8')

    // Insertar la URL de confirmación en el HTML
    estructuraHTML = estructuraHTML.replace('{{confirmacionUrl}}', confirmacionUrl)

    await transporter.sendMail({
        from: '👻' + correo, // sender address
        to: correo, // list of receivers
        subject: "Confirmacion de reservacion", // Subject line
        text: "Por favor, confirma tu reservación haciendo clic en el siguiente enlace: " + confirmacionUrl,
        html: estructuraHTML, // html body
    })

    console.log("Correo enviado exitosamente")
}


async function EnviodeCorreoConfirmacion(correo, datosDeReservacion) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: "saltodecuenta2023@gmail.com",
            pass: "ylmw dbry mbom sghc",
        }
    })

    const htmlBody = `
        <p>Tu reservación ha sido confirmada.</p>
        <p><strong>Nombre:</strong> ${datosDeReservacion.nombreReservacion}</p>
        <p><strong>Apellido:</strong> ${datosDeReservacion.apellidoReservacion}</p>
        <p><strong>Correo:</strong> ${datosDeReservacion.mailReservacion}</p>
        <p><strong>Teléfono:</strong> ${datosDeReservacion.telefonoReservacion}</p>
        <p><strong>Fecha:</strong> ${datosDeReservacion.fechaReservacion}</p>
        <p><strong>Hora:</strong> ${datosDeReservacion.horaReservacion}</p>
        <p><strong>Cantidad:</strong> ${datosDeReservacion.cantidadReservacion}</p>
        <a href="https://ibb.co/cwzcBjg"><img src="https://i.ibb.co/cwzcBjg/vaca.jpg" alt="vaca" border="0"></a>`

    try {
        await transporter.sendMail({
            from: '👻' + correo, // sender address,
            to: correo, // list of receivers
            subject: "Reservación confirmada", // Subject line
            text: `Tu reservación ha sido confirmada.\n
                   Nombre: ${datosDeReservacion.nombreReservacion}\n
                   Apellido: ${datosDeReservacion.apellidoReservacion}\n
                   Correo: ${datosDeReservacion.mailReservacion}\n
                   Teléfono: ${datosDeReservacion.telefonoReservacion}\n
                   Fecha: ${datosDeReservacion.fechaReservacion}\n
                   Hora: ${datosDeReservacion.horaReservacion}\n
                   Cantidad: ${datosDeReservacion.cantidadReservacion}`, // plain text body
            html: htmlBody // html body
        })

    } catch (error) {
        console.error("Error al enviar el correo de confirmación:", error)
    }
}

const Puerto = 3000
app.listen(Puerto, () => {
    console.log(`Servidor levantado en el puerto ${Puerto}`)
})

console.log("hola")