import { Router } from "express"
import controladoresLeer from "../controladores/controladoresLeer.js"
import controladoresInsertar from "../controladores/controladoresInsertar.js"

const router = Router()
//Aqui van las rutas
//ej router.get("/", controaldor.{funcion del controlador})
//Funciones de Lectura --Sin testear
router.get('/leer/mozos/sector', controladoresLeer.leerMozosSector)
router.get('/leer/reservaciones/sector', controladoresLeer.leerReservacionesSector)
router.get('/leer/reservaciones', controladoresLeer.leerReservaciones)
router.get('/leer/sectores', controladoresLeer.leerSectores)
router.get('/obtener/datos/:correoURL', controladoresInsertar.obtenerDatosCorreo)
router.post('/confirmar/reservacion', controladoresInsertar.insertarReservacion)

export default router