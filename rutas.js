import { Router } from "express"
import controladores from "./controladores.js"

const router = Router()
//Aqui van las rutas
//ej router.get("/", controaldor.{funcion del controlador})
//Funciones de Lectura --Sin testear
router.get('leer/mozos/sector', controladores.leerMozosSector)
router.get('leer/reservaciones/sector', controladores.leerReservacionesSector)
router.get('leer/reservaciones', controladores.leerReservaciones)
router.get('leer/sectores', controladores.leerSectores)

export default router