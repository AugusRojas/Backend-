import conexion from "../servicios/basedatos.js";

const actualizarMozos = (req, res) => {
  const { idMozo, nombreMozo, apellidoMozo, telefonoMozo, mailMozo, idSector } =
    req.body;
  try {
    conexion.query(
      `UPDATE mozos SET nombreMozo = '${nombreMozo}', apellidoMozo = '${apellidoMozo}', telefonoMozo= '${telefonoMozo}', mailMozo='${mailMozo}', idSector = '${idSector}' WHERE idMozo = '${idMozo}'`,
      (err, results) => {
        if (err) {
          console.log("Error: ", err);
        } else {
          res.json({ mensaje: "Datos actualizados con exito" });
        }
      }
    );
  } catch (error) {
    throw new Error("Error en la consulta: ", error);
  }
};

export default { actualizarMozos };
