import { Router } from "express"
import controladoresLeer from "../controladores/controladoresLeer.js"
import controladoresInsertar from "../controladores/controladoresInsertar.js"
import controladoresEliminar from "../controladores/controladoresEliminar.js"
import controladoresActualizar from '../controladores/controladoresActualizar.js'

const router = Router()
//Aqui van las rutas
//ej router.get("/", controaldor.{funcion del controlador})
//Funciones de Lectura --Sin testear
router.get('/leer/mozos/sector', controladoresLeer.leerMozosSector)
router.get('/leer/reservaciones/sector', controladoresLeer.leerReservacionesSector)
router.get('/leer/reservaciones', controladoresLeer.leerReservaciones)
router.get('/leer/sectores', controladoresLeer.leerSectores)
router.get('/obtener/datos/:correoURL', controladoresInsertar.obtenerDatosCorreo)
router.get('/leer/mozos', controladoresLeer.leerMozos)
router.get('/leer/mesas', controladoresLeer.leerMesas)
router.post('/confirmar/reservacion', controladoresInsertar.insertarReservacion)
router.put('/actualizar/mozos', controladoresActualizar)
router.delete('/eliminar/mozos/:id', controladoresEliminar.eliminarMozo)
router.delete('/eliminar/reservaciones/:id', controladoresEliminar.eliminarReservacion)

export default router
