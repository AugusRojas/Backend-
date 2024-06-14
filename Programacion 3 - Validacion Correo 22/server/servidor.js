import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import fs from 'fs'


const app = express()

app.use(cors())
app.use(express.json())

app.get("/data", (req, res) => {
    res.send("<h1>hola capo ya tenes alto servidor</h1>")
})

app.post("/data", async (req, res) => { 
    let datosRecibidos = req.body
    console.log(datosRecibidos)
    const { nombre, apellido, correo } = req.body

    if (nombre && apellido && correo) {

        try {
            await EnviodeCorreo(correo) //este await espera a que se envie el correo y despues continua ejecutandose las siguientes lineas de codigo
            let mensaje = { me: "correo enviado" }
            console.log(mensaje)
            return res.json(mensaje)
        } 
        catch (error) {
            console.error("Error al enviar correo:", error)
            return res.json({ me: "Error al enviar correo" })
        }
    }
     else {
        let mensaje = { me: "Complete los campos para poder reservar" }
        console.log(mensaje)
        return res.json(mensaje) 
    }
})

const Puerto = 3000
app.listen(Puerto, () => {
    console.log(`Servidor levantado en el puerto ${Puerto}`)
})

console.log("hola")



async function EnviodeCorreo(correo) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: "saltodecuenta2023@gmail.com",
            pass: "ylmw dbry mbom sghc",
        },
    })
    
    const estructuraHTML = fs.readFileSync("server/correo.html", 'utf-8')
    // send mail with defined transport object
    transporter.sendMail({
        from: '👻' + correo, // sender address
        to: correo, // list of receivers
        subject: "Confirmacion de reservacion", // Subject line
        text: "Hello world?", // plain text body
        html: estructuraHTML, // html body
    })
}