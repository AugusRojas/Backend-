import mysql from 'mysql2'

//Aqui va tus valores de la base de datos
const conexion = mysql.createConnection({
    host : "",
    user: "",
    password: "",
    database: ""
})

export default conexion
