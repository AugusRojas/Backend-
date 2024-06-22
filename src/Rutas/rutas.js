import { Router } from "express";
import controladoresLeer from "../controladores/controladoresLeer.js";
import controladoresInsertar from "../controladores/controladoresInsertar.js";
import controladoresEliminar from "../controladores/controladoresEliminar.js";
import controladoresActualizar from "../controladores/controladoresActualizar.js";

const router = Router();

//Aqui van las rutas

router.get("/leer/mozos/sector", controladoresLeer.leerMozosSector);
router.get("/leer/reservaciones/sector",controladoresLeer.leerReservacionesSector);
router.get("/leer/reservaciones", controladoresLeer.leerReservaciones);
router.get("/leer/sectores", controladoresLeer.leerSectores);
router.get("/obtener/datos/:correoURL",controladoresInsertar.obtenerDatosCorreo);
router.get("/leer/mozos", controladoresLeer.leerMozos);
router.get("/leer/mesas", controladoresLeer.leerMesas);
router.post("/insertar/reservacion", controladoresInsertar.insertarReservacion);
router.post('/insertar/mozos', controladoresInsertar.insertarMozos)
router.put("/actualizar/mozos", controladoresActualizar.actualizarMozos);
router.delete("/eliminar/mozos/:id", controladoresEliminar.eliminarMozo);
router.delete("/eliminar/reservaciones/:id",controladoresEliminar.eliminarReservacion);

export default router;
