import  conexion  from '../servicios/basedatos.js'

//Aqui van las funciones que van a manejar las rutas y las que van a contener
//las consultas sql

//Funciones de lectura 
const leerMesas =  (req, res)=>{
    try{
        conexion.query('SELECT * FROM mesas', (err, results)=>{
            if(err){
                throw new Error('Error: ', err)
            }
            else{
                res.json(results)
            }
        
        }
    )
}
catch(error){
    throw new Error('error en la consulta, ', error)
}
}


const leerMozosSector = (req, res)=>{
    conexion.query('SELECT mozos.nombreMozo, mozos.apellidoMozo, sectores.nombreSector FROM mozos JOIN sectores ON mozos.idSector = sectores.idSector;', 
        (err, results)=>{
            if(err){
                console.log('Error en leerMozosSector: ' + err)
            }
            else{
                res.json(results)
            }
        }
    )
}
const leerReservacionesSector = (req, res) =>{
    conexion.query(
`SELECT 
	reservaciones.nombreReservacion, 
	reservaciones.apellidoReservacion, 
	reservaciones.fechaReservacion, 
	mesas.idMesas, 
	sectores.nombreSector 
FROM 
	reservaciones 
JOIN 
	mesas ON reservaciones.idReservacion = mesas.idReservacion 
JOIN 
	sectores ON mesas.idSectores = sectores.idSector;`, 
    (err, results)=>{
        if(err){
            console.log('Error en leerReservacionesSector: ' + err)
        }
        else{
            res.json(results)
        }
    })
}

const leerReservaciones = (req, res)=>{
    conexion.query('SELECT * FROM reservaciones', (err, results)=>{
        if(err){
            console.log('Error en Leer reservaciones: ' + err)
        }
        else{
            res.json(results)
        }
    })
}
const leerSectores = (req, res) =>{
    conexion.query('SELECT * FROM sectores', 
        (err, results)=>{
            if(err){
                console.log('Error en leerSectores: ' + err)
            }
            else{
                res.json(results)
            }
        }
    )
}

const leerMozos = (req, res) =>{
	conexion.query('SELECT * FROM  mozos', (err, results)=>{
		if(err){
			console.log(err)
			}
		else{
			res.json(results)
		}
		})
	}



export default {
    leerMozosSector, 
    leerReservacionesSector, 
    leerReservaciones, 
    leerSectores,
    leerMesas,
    leerMozos
}
