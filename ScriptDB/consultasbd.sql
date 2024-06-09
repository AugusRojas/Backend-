-- Insertar datos en la tabla 'sectores'
INSERT INTO `reservacionesbar`.`sectores` (`nombreSector`) VALUES 
('Terraza'),
('Barra'),
('Salón Principal'),
('Salón VIP'),
('Jardín');

-- Insertar datos en la tabla 'bebidas'
INSERT INTO `reservacionesbar`.`bebidas` (`clasificacionBebidas`, `nombre_bebidas`) VALUES 
('Alcohol', 'Whisky'),
('Alcohol', 'Vino Tinto'),
('Sin Alcohol', 'Jugo de Naranja');

-- Insertar datos en la tabla 'comidas'
INSERT INTO `reservacionesbar`.`comidas` (`nombreComida`, `descripcionComida`, `imgComida`) VALUES 
('Hamburguesa', 'Hamburguesa con queso y tocino', 'img/hamburguesa.jpg'),
('Ensalada', 'Ensalada de vegetales frescos', 'img/ensalada.jpg');

-- Insertar datos en la tabla 'carta'
INSERT INTO `reservacionesbar`.`carta` (`nombreMenu`, `descripcionMenu`, `idBebidas`, `idComidas`) VALUES 
('Menú Ejecutivo', 'Incluye bebida y plato principal', 1, 1),
('Menú Vegetariano', 'Incluye bebida y ensalada', 3, 2);

-- Insertar datos en la tabla 'reservaciones'
INSERT INTO `reservacionesbar`.`reservaciones` (`nombreReservacion`, `apellidoReservacion`, `mailReservacion`, `fechaReservacion`, `cantidadReservacion`, `idMesas`) VALUES 
('Juan', 'Pérez', 'juan.perez@mail.com', '2024-06-10', 4, NULL),
('Ana', 'Gómez', 'ana.gomez@mail.com', '2024-06-11', 2, NULL);

-- Insertar datos en la tabla 'mesas'
INSERT INTO `reservacionesbar`.`mesas` (`cantidadMesas`, `estadoMesas`, `idSectores`, `idReservacion`) VALUES 
(4, 'Disponible', 1, 1),
(2, 'Ocupada', 2, 2);

-- Insertar datos en la tabla 'mozos'
INSERT INTO `reservacionesbar`.`mozos` (`nombreMozo`, `apellidoMozo`, `telefonoMozo`, `mailMozo`, `idSector`) VALUES 
('Carlos', 'López', '123456789', 'carlos.lopez@mail.com', 1),
('María', 'Rodríguez', '987654321', 'maria.rodriguez@mail.com', 2);

SELECT * FROM `reservacionesbar`.`bebidas`;

SELECT * FROM `reservacionesbar`.`comidas`;

SELECT * FROM `reservacionesbar`.`sectores`;

SELECT * FROM `reservacionesbar`.`mozos`;

SELECT * FROM `reservacionesbar`.`carta`;

SELECT * FROM `reservacionesbar`.`reservaciones`;

SELECT * FROM `reservacionesbar`.`mesas`;


-- Esta consulta me da los datos de la los campos de reservaciones con un campo de mesa y un campo 
--de sectores mediante un inner join

SELECT 
    r.nombreReservacion,
    r.fechaReservacion,
    r.cantidadReservacion,
    m.idMesas,
    s.nombreSector
FROM 
    reservacionesbar.reservaciones r
JOIN 
    reservacionesbar.mesas m ON r.idReservacion = m.idReservacion
JOIN 
    reservacionesbar.sectores s ON m.idSectores = s.idSector;
    
--Esta lo que hace es mostrarme campos de mozos con un campo de sectores
SELECT 
    mo.idMozo,
    mo.nombreMozo,
    mo.apellidoMozo,
    s.nombreSector
FROM 
    reservacionesbar.sectores s
JOIN 
    reservacionesbar.mozos mo ON s.idSector = mo.idSector;
    
--Esta consulta muestra el id de mesas la cantidad(capacidad) de las mesas y el sector donde están las
--determinadas mesas
SELECT 
	m.idMesas,
    m.cantidadMesas,
    s.nombreSector
FROM
	reservacionesbar.sectores s
JOIN 
	reservacionesbar.mesas m ON m.idSectores = s.idSector;
    







