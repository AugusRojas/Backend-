import conexion from '../servicios/basedatos.js'



const eliminarMozo = (req, res)=>{
    const idMozo = req.params.id
    try {
        conexion.query(`DELETE FROM mozos WHERE idMozo=${idMozo}`)
    } catch (error) {
        throw new Error('Error en la consulta: ', error)
    }
}

const eliminarReservacion=(req,res)=>{
    const idReservacion = req.params.id
    try {
        conexion.query(`DELETE FROM reservaciones WHERE idReservaciones=${idReservacion}`)
    } catch (error) {
        throw new Error('Error en la consulta', error)
    }
}


export default {eliminarMozo, eliminarReservacion}