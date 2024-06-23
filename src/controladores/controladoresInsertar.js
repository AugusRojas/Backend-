import conexion from "../servicios/basedatos.js";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const insertarReservacion = (req, res) => {
  let datosRecibidos = req.body;
  console.log(datosRecibidos)

  const { nombre, apellido, correo, telefono, fecha, hora, cantidad } =
    datosRecibidos;

  if (
    nombre !== "" &&
    apellido !== "" &&
    correo !== "" &&
    telefono !== "" &&
    fecha !== "" &&
    hora !== "" &&
    cantidad !== ""
  ) {
    const correoURL = encodeURIComponent(correo);
    const nombreURL = encodeURIComponent(nombre);
    const apellidoURL = encodeURIComponent(apellido);
    const telefonoURL = encodeURIComponent(telefono);
    const fechaURL = encodeURIComponent(fecha);
    const horaURL = encodeURIComponent(hora);
    const confirmationUrl = `http://localhost:3000/api/obtener/datos/${correoURL}?nombre=${nombreURL}&apellido=${apellidoURL}&telefono=${telefonoURL}&fecha=${fechaURL}&hora=${horaURL}&cantidad=${cantidad}`;

    try {
      // Guardar los datos en la base de datos
      conexion.connect((error) => {
        if (error) {
          console.log("Error al conectar a la base de datos:", error);
        }
        console.log("Conexión Exitosa");

        const consulta = `INSERT INTO reservaciones (nombreReservacion, apellidoReservacion, mailReservacion, telefonoReservacion, fechaReservacion, horaReservacion, cantidadReservacion) VALUES ('${nombre}', '${apellido}', '${correo}', '${telefono}', '${fecha}', '${hora}', '${cantidad}')`;

        conexion.query(consulta, (error) => {
          if (error) {
            console.error("Error al insertar la reservación:", error);
            return res.send("Error al insertar la reservación");
          }


          try {
            EnviodeCorreo(correo, confirmationUrl); // Enviar el primer correo con la URL de confirmación
            let mensaje = { me: "correo enviado" };
            console.log(mensaje);
            return res.json(mensaje);
          } catch (error) {
            console.error("Error al enviar correo:", error);
            return res.json({ me: "Error al enviar correo" });
          }
        });
      });
    } catch (error) {
      console.error("Error en el proceso de reserva:", error);
      return res.send("Error en el proceso de reserva");
    }
  } else {
    let mensaje = { me: "Complete los campos para poder reservar" };
    console.log(mensaje);
    return res.json(mensaje);
  }
};

const obtenerDatosCorreo = async (req, res) => {
  const correoURLDeco = decodeURIComponent(req.params.correoURL);
  const { nombre, apellido, telefono, fecha, hora, cantidad } = req.query;

  let datosRecuperados = {
    nombreReservacion: nombre,
    apellidoReservacion: apellido,
    mailReservacion: correoURLDeco,
    telefonoReservacion: telefono,
    fechaReservacion: fecha,
    horaReservacion: hora,
    cantidadReservacion: cantidad,
  };
  await EnviodeCorreoConfirmacion(correoURLDeco, datosRecuperados);
  res.redirect(
    "https://666c75dca47bf9e4e65ef28d--spontaneous-lily-b918cd.netlify.app/"
  );
};

const EnviodeCorreo = async (correo, confirmacionUrl) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "saltodecuenta2023@gmail.com",
      pass: "ylmw dbry mbom sghc",
    },
  });
  const filePath = path.join(__dirname, "../Public/correo.html");

  let estructuraHTML = fs.readFileSync(filePath, "utf-8");

  // Insertar la URL de confirmación en el HTML
  estructuraHTML = estructuraHTML.replace(
    "{{confirmacionUrl}}",
    confirmacionUrl
  );

  await transporter.sendMail({
    from: "👻" + correo, // sender address
    to: correo, // list of receivers
    subject: "Confirmacion de reservacion", // Subject line
    text:
      "Por favor, confirma tu reservación haciendo clic en el siguiente enlace: " +
      confirmacionUrl,
    html: estructuraHTML, // html body
  });

  console.log("Correo enviado exitosamente");
};

const EnviodeCorreoConfirmacion = async (correo, datosDeReservacion) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "saltodecuenta2023@gmail.com",
      pass: "ylmw dbry mbom sghc",
    },
  });

  const htmlBody = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333; padding: 20px;">
        <h2 style="text-align: center;">Reservación Confirmada</h2>
        <p>Hola ${datosDeReservacion.nombreReservacion},</p>
        <p>Tu reservación ha sido confirmada para el día <strong>${datosDeReservacion.fechaReservacion}</strong> a horas <strong>${datosDeReservacion.horaReservacion}</strong>.</p>
        <p><strong>Detalles de la Reservación:</strong></p>
        <ul style="list-style-type: none; padding: 0;">
            <li><strong>Nombre:</strong> ${datosDeReservacion.nombreReservacion}</li>
            <li><strong>Apellido:</strong> ${datosDeReservacion.apellidoReservacion}</li>
            <li><strong>Cantidad de mesas reservadas:</strong> ${datosDeReservacion.cantidadReservacion}</li>
        </ul>
        <div style="text-align: center; margin-top: 20px;">
            <a href="https://ibb.co/cwzcBjg" style="display: inline-block; text-decoration: none; color: #007bff;">
                <img src="https://i.ibb.co/cwzcBjg/vaca.jpg" alt="vaca" style="max-width: 100%; height: auto; border: 0;">
            </a>
        </div>
        <p style="text-align: center; margin-top: 20px;">Gracias por reservar con nosotros.</p>
        <footer style="background-color: #f8f9fa; padding: 10px; text-align: center; margin-top: 20px; border-top: 1px solid #ddd;">
            <p>Este correo electrónico ha sido enviado por el equipo de &copy; Vacas Food.</p>
            <p><a href="#" style="color: #007bff;">Política de Privacidad</a> | <a href="#" style="color: #007bff;">Términos de Servicio</a></p>
        </footer>
    </div>`;

  try {
    await transporter.sendMail({
      from: "👻" + correo, // sender address,
      to: correo, // list of receivers
      subject: "Reservación confirmada", // Subject line
      text: ``, // plain text body
      html: htmlBody, // html body
    });
  } catch (error) {
    console.error("Error al enviar el correo de confirmación:", error);
  }
};

const insertarMozos = (req,res) =>{
  const { nombreMozo, apellidoMozo, telefonoMozo, mailMozo, idSector } = req.body;

try {
  const sql = "INSERT INTO mozos (nombreMozo, apellidoMozo, telefonoMozo, mailMozo, idSector) VALUES (?, ?, ?, ?, ?)";
  const values = [nombreMozo, apellidoMozo, telefonoMozo, mailMozo, idSector];

  conexion.query(sql, values, (err, results) => {
    if (err) {
      console.log('Error en insertarMozos: ', err);
      res.status(500).json({ error: 'Error en la consulta SQL' });
    } else {
      console.log('Inserción exitosa de mozo');
      res.json(results);
    }
  });
} catch (error) {
  console.log('Error en la consulta: ', error);
  res.status(500).json({ error: 'Error en la consulta' });
}


}


export default {  insertarReservacion, 
                  obtenerDatosCorreo,
                  insertarMozos 
              };
