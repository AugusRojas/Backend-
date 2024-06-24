import conexion from "../servicios/basedatos.js";


const iniciarSesion = (req, res) => {
    const { username, password } = req.body;
    try {
        // Usando placeholders (?) para evitar la inyección SQL
        const sql = `SELECT * FROM administrador WHERE usuario = ? AND contraseña = ?`;
        conexion.query(sql, [username, password], (err, results) => {
            if (err) {
                console.log('Error al ejecutar la consulta:', err);
                res.status(500).json({ error: 'Error interno del servidor' });
                return;
            }
            if (results.length > 0) {
                res.json({ mensaje: 'Inicio de sesión exitoso' });
            } else {
                res.status(401).json({ error: 'Credenciales inválidas' });
            }
        });
    } catch (error) {
        console.log('Error al ejecutar la consulta', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export default iniciarSesion;
