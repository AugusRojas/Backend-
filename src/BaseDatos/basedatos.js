import mysql from 'mysql2'

//Aqui va tus valores de la base de datos
const conexion = mysql.createConnection({
    host : "localhost",
    user: "root",
    password: "",
    database: "reservacionesbar"
})

export default conexion
