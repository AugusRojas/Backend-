import conexion from "../servicios/basedatos.js";

const eliminarMozo = (req, res) => {
  const idMozo = req.params.id;
  try {
    conexion.query(`DELETE FROM mozos WHERE idMozo='${idMozo}'`, (error) => {
      if (error) res.send(error);
      else res.status(200).send("Se elimino la el mozo correctamente");
    });
  } catch (error) {
    throw new Error("Error en la consulta: ", error);
  }
};

const eliminarReservacion = (req, res) => {
  const idReservacion = req.params.id;
  try {
    conexion.query(
      `UPDATE mesas SET cantidadMesas=null, estadoMesas="libre",idSectores=null , idReservacion=null WHERE idReservacion =${idReservacion}`
    );
    conexion.query(
      `DELETE FROM reservaciones WHERE idReservacion=${idReservacion}`
    );
    res.status(200).send("Se elimino correctamente la reservacion");
  } catch (error) {
    throw new Error("Error en la consulta", error);
  }
};

export default { eliminarMozo, eliminarReservacion };
