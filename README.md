# Backend- Importante
Aqui van a estar las carpetas del backend, y de las bases de datos
#Recordar-
Instalar las dependencias con 'npm i' 

#TODOS- Realizar copia de seguridad del repositorio antes de clonarlo

#Augusto Rojas:
Actualizacion 11/06/2024
Cambie los nombres de las variables y de las llaves foraneas, para su correcto uso.
Tambien agregue valores y algunos comandos para facilitarles las tareas de consultas.

#Prieto Matias-
Actualización 12/06/2024 
Agregada varias funciones de lecturas, debemos agilizar las funciones para insersion de datos 

#Reinoso Lisandro :
Actualizacion 14/06/2024 
Agregue los campos telefonoReservacion, horaReservacion a la tabla reservaciones.
Subo el servdor de correo, con index.html simple para prueba, consta de dos correos uno para confirmar reservacion y el segundo para decir que esta la reserva confirmada

#Prieto Matias-
Actualizacion 14/06/2024
Reestructuracion del proyecto para mejor organizacion entre los modulos de exportacion. Reconfiguracion de la base de datos, modifiqué la columna telefono de la tabla reservaciones, estaba en int(10) y lo modifique a varchar(25) para que permita ingresar codigo de area. Incorporacion del servicio de correo. Creacion de carpeta 'Public' para servir archivos estaticos que nos permitiran mostrarlo en el correo. Ante cualquier duda o error consultar.


#Prieto Matias-
Actualizacion 21/06/2024
Agregada las funcionalidad de eliminar mozos, actualizar mozos, y eliminar reservacion. Cambio de la
carpeta 'basededatos' por 'servicios'. Agregada tambien la consulta de leer mesas para comprobaciones
desde el lado del administrador 

#Prieto Matias-
Actualizacion 22/06/2024
Agregada la funcion de insertar mozos

#Reinoso Lisandro - 23/06/2024  
Agregada los estilos a los dos correos, agregada nuevos campos a la tabla bebidas con imgBebida, nombreBebida, precioBebida, descripcionBebida a la tabla comidas se le agrega el campo comidaPrecio. estas tablas continen registros de comidas y bebidas en el script reservacionesbar Actu 23-06-2024.sql.
Agregado tambien el controlador para generar el menu PDF, (al instalar puppeteer, se pone los comandos "set PUPPETEER_SKIP_DOWNLOAD=true && npm install puppeteer", en la consola del vsc ) libreria para generar PDF


#Prieto Matias-
Actualizacion 23/06/2024
Corregido varios errores al momento de la inserción de datos. Agregada la funcion de asignacion de mesas. 
