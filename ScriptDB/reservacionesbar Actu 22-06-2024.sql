select * from sectores;
select * from reservaciones;
select * from mozos;
select * from mesas;

ALTER TABLE mesas
MODIFY COLUMN idReservacion int null ;

INSERT INTO reservaciones (nombreReservacion,apellidoReservacion,mailReservacion,telefonoReservacion,fechareservacion,cantidadReservacion)
VALUES('Carlos Augusto','Rojas','augus32132@gmail.com',3816337435,'2024-06-14',5);

insert into mozos (nombreMozo,apellidoMozo,telefonoMozo,mailMozo,idSector) values('Cucu','Rojas',3816334536,'augus213123@qwdqd',1);

select mozos.nombreMozo, mozos.apellidoMozo ,sectores.nombreSector from mozos
inner join sectores on mozos.idSector = sectores.idSector; 

update mozos  set idSector= 1 where idMozo = 11;


SELECT 
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
	sectores ON mesas.idSectores = sectores.idSector;