-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-06-2024 a las 13:24:24
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `reservacionesbar`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bebidas`
--

CREATE TABLE `bebidas` (
  `idBebidas` int(11) NOT NULL,
  `nombreBebida` varchar(20) DEFAULT NULL,
  `precioBebida` decimal(30,0) DEFAULT NULL,
  `descripcionBebida` varchar(3000) DEFAULT NULL,
  `imgBebida` varchar(3000) DEFAULT NULL,
  `clasificacionBebidas` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `bebidas`
--

INSERT INTO `bebidas` (`idBebidas`, `nombreBebida`, `precioBebida`, `descripcionBebida`, `imgBebida`, `clasificacionBebidas`) VALUES
(1, 'Freepik', 3200, 'Cóctel de ginebra rosa', 'https://bodegassalas.com/wp-content/uploads/2021/12/portada-con-que-mezclar-ginebra-rosa-01.jpg', 'Alcoholica'),
(2, 'Coctel', 4100, 'Una mezcla de licores y jugos,', 'https://imgs.search.brave.com/BLvHhyuM22HVpb0bA-wYE2EbAt5AR6xq9vz2fNzClxI/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90MS51/Yy5sdG1jZG4uY29t/L2VzL3Bvc3RzLzcv/NS82L2JlbGxpbmlf/NDI2NTdfMF82MDAu/anBn', 'Alcoholica'),
(3, 'Caipiriña', 2500, 'Refrescante cóctel brasileño con lima, azúcar y cachaça, ideal para tardes calurosas', 'https://www.beerpassclub.com/wp-content/uploads/2022/11/cucumber-cocktail-with-lime-against-the-hedge-in-g-2021-09-07-00-54-09-utc-scaled-1-691x1024.jpg', 'Alcoholica'),
(4, 'Pepsi', 2400, 'Pepsi 1.5 L: Refrescante y burbujeante, perfecta para compartir.', 'https://lh4.googleusercontent.com/proxy/3tI_PI4ZydzBm2jasBeZZPTNh-LVER18QaaMq31O66jsvvD5J7vep6OPprK9S4NEu4mzqByf7I-GxPUzJbtYYDvUo4noGl6AGm0nX3fojNSncpg', 'No Alcoholica'),
(5, 'Coca', 2600, 'Coca-Cola 1.5 L: La emblemática gaseosa, conocida por su sabor único y refrescante. Perfecta para compartir y disfrutar en cualquier momento', 'https://www.liderlogo.es/wp-content/uploads/2023/01/coca-cola-logo-768x512.jpg', 'No Alcoholica'),
(6, 'Sprite', 2700, 'Sprite 1.5 L: La bebida gaseosa de limón y lima, famosa por su frescura y efervescencia.Aportando un toque refrescante a tus momentos.', 'https://mktadstrategies.files.wordpress.com/2016/03/sprite.jpg?w=1400&h=875&crop=1', 'No Alcoholica'),
(7, 'Quilmes', 2300, 'Quilmes 1L: La cerveza argentina por excelencia, con un sabor suave y refrescante.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvYYiAIGajAqDfeJZd3mdPiJxJ1FQ3eUqHTg&s', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carta`
--

CREATE TABLE `carta` (
  `idMenus` int(11) NOT NULL,
  `nombreMenu` varchar(45) DEFAULT NULL,
  `descripcionMenu` varchar(45) DEFAULT NULL,
  `idBebidas` int(11) NOT NULL,
  `idComidas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comidas`
--

CREATE TABLE `comidas` (
  `idComida` int(11) NOT NULL,
  `nombreComida` varchar(45) DEFAULT NULL,
  `precioComida` decimal(30,0) DEFAULT NULL,
  `descripcionComida` varchar(300) DEFAULT NULL,
  `imgComida` varchar(3900) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comidas`
--

INSERT INTO `comidas` (`idComida`, `nombreComida`, `precioComida`, `descripcionComida`, `imgComida`) VALUES
(1, 'Vaca Burger', 4500, 'Vaca Burger: Doble carne, queso, lechuga, pepinillos y salsa especial en pan con sésamo', 'https://imgs.search.brave.com/bOB7W1SBEgZZfi3LX067bVNJYCukqkmL0NS4cdP3kzg/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9wNC53/YWxscGFwZXJiZXR0/ZXIuY29tL3dhbGxw/YXBlci80My81Njkv/MzE5L2Zvb2QtYnVy/Z2Vycy1idXJnZXIt/d2FsbHBhcGVyLXBy/ZXZpZXcuanBn'),
(2, 'Pizza', 4200, 'Pizza: Deliciosa pizza con muzza, pepperoni, champiñones y morrón.', 'https://imgs.search.brave.com/1O-jNbSxe6Ah-lkjwpoEtdjfW4xH8nnh5y81spOCkvE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTgy/MTQ4NzExL3Bob3Rv/L3BpenphLWZyb20t/dGhlLXRvcC1kZWx1/eGUuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPXVJNmtlVDNB/TUluVWhRQXEyMUlC/SGtpMmtySVRPemdN/QUtVOW9lWGpRbnM9'),
(3, 'Milanesa Napolitana', 6800, 'Milanesa a la napolitana: Milanesa con salsa de tomate, jamón, y queso gratinado, acompañada de crujientes papas fritas. Un clásico argentino irresistible.', 'https://resizer.glanacion.com/resizer/v2/milanesa-a-la-napolitana-con-guarnicion-de-papas-VLWFAANIWBGPFO4CSUHS7RYVVQ.jpg?auth=335fda04cf2733e39d11ca0ba979c1d0a8a55e6cdec15e4d5b00cfd59fbf9ed8&width=768&height=512&quality=70&smart=true'),
(4, 'Sanguche de Milanesa', 3900, 'Sánguche de milanesa tucumano:Milanesa de carne en pan fresco, con lechuga, tomate, cebolla y un toque de limón. Un clásico Tucumano, lleno de sabor y tradición.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7VjWEb6sxuRpTMN22JnsscX64m_mu7dYUXM9FUsY-JiWxSYeq-apEUDXVMVAWuLBtjJo&usqp=CAU'),
(5, 'Asado', 7550, 'Asado: Jugosos cortes de carne a la parrilla acompañados de vegetales asados, papas, y salsas tradicionales.', 'https://www.cronista.com/files/image/303/303826/5ffe1fb77d08a.png'),
(6, 'Tortilla de papa', 4800, 'Tortilla de papa: Clásica tortilla española con papas doradas y huevos, suave por dentro y dorada por fuera.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtKUbit7tHGKRJ1APlrDhgC0G84uIq1WH1dQ&s');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mesas`
--

CREATE TABLE `mesas` (
  `idMesas` int(11) NOT NULL,
  `cantidadMesas` int(11) DEFAULT NULL,
  `estadoMesas` varchar(15) DEFAULT NULL,
  `idSectores` int(11) NOT NULL,
  `idReservacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Alterar la tabla `mesas` para permitir que `idReservacion` sea NULL

ALTER TABLE `mesas`
MODIFY COLUMN `idReservacion` int(11) NULL DEFAULT NULL;


INSERT INTO `mesas` (`idMesas`, `cantidadMesas`, `estadoMesas`, `idSectores`, `idReservacion`) VALUES
(1, 4, 'Libre', 1, NULL),
(2, 4, 'Libre', 1, NULL),
(3, 4, 'Libre', 1, NULL),
(4, 4, 'Libre', 2, NULL),
(5, 4, 'Libre', 2, NULL),
(6, 4, 'Libre', 2, NULL),
(7, 4, 'Libre', 2, NULL),
(8, 4, 'Libre', 3, NULL),
(9, 4, 'Libre', 3, NULL),
(10, 4, 'Libre', 3, NULL);


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mozos`
--

CREATE TABLE `mozos` (
  `idMozo` int(11) NOT NULL,
  `nombreMozo` varchar(45) DEFAULT NULL,
  `apellidoMozo` varchar(45) DEFAULT NULL,
  `telefonoMozo` varchar(15) DEFAULT NULL,
  `mailMozo` varchar(100) DEFAULT NULL,
  `idSector` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `mozos`
MODIFY COLUMN `idMozo` int(11) NOT NULL AUTO_INCREMENT,
ADD PRIMARY KEY (`idMozo`);
ALTER TABLE `mozos`
MODIFY COLUMN `idSector` int(11) NULL;


INSERT INTO `mozos` (`idMozo`, `nombreMozo`, `apellidoMozo`, `telefonoMozo`, `mailMozo`, `idSector`) VALUES
(1, 'Juan', 'Perez', '1122334455', 'juanperez@example.com', 1),
(2, 'Maria', 'Gonzalez', '1122334466', 'mariagonzalez@example.com', 2),
(3, 'Carlos', 'Lopez', '1122334477', 'carloslopez@example.com', 3),
(4, 'Ana', 'Martinez', '1122334488', 'anamartinez@example.com', 4);


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservaciones`
--

CREATE TABLE `reservaciones` (
  `idReservacion` int(11) NOT NULL,
  `nombreReservacion` varchar(45) DEFAULT NULL,
  `apellidoReservacion` varchar(45) DEFAULT NULL,
  `mailReservacion` varchar(45) DEFAULT NULL,
  `telefonoReservacion` int(10) DEFAULT NULL,
  `fechaReservacion` date DEFAULT NULL,
  `horaReservacion` time DEFAULT NULL,
  `cantidadReservacion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservaciones`
--

INSERT INTO `reservaciones` (`idReservacion`, `nombreReservacion`, `apellidoReservacion`, `mailReservacion`, `telefonoReservacion`, `fechaReservacion`, `horaReservacion`, `cantidadReservacion`) VALUES
(2, 'nombre_ejemplo', 'apellido_ejemplo', 'lisandoreinoso075@gmail.com', 0, '2024-06-15', '22:30:00', 1),
(3, 'María', 'López', 'marialopez@example.com', 1122334477, '2024-06-20', '19:30:00', 3),
(4, 'Luis', 'González', 'luisgonzalez@example.com', 1122334488, '2024-06-22', '20:00:00', 2),
(5, 'Ana', 'Martínez', 'anamartinez@example.com', 1122334499, '2024-06-25', '18:00:00', 4);


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sectores`
--

CREATE TABLE `sectores` (
  `idSector` int(11) NOT NULL,
  `nombreSector` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `sectores` (`idSector`, `nombreSector`) VALUES
(1, 'Interior'),
(2, 'Exterior'),
(3, 'Segundo Piso');


--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bebidas`
--
ALTER TABLE `bebidas`
  ADD PRIMARY KEY (`idBebidas`);

--
-- Indices de la tabla `carta`
--
ALTER TABLE `carta`
  ADD PRIMARY KEY (`idMenus`),
  ADD KEY `fk_menus_bebidas1_idx` (`idBebidas`),
  ADD KEY `fk_menus_comidas1_idx` (`idComidas`);

--
-- Indices de la tabla `comidas`
--
ALTER TABLE `comidas`
  ADD PRIMARY KEY (`idComida`);

--
-- Indices de la tabla `mesas`
--
ALTER TABLE `mesas`
  ADD PRIMARY KEY (`idMesas`),
  ADD KEY `idSectores` (`idSectores`),
  ADD KEY `fk_idReservacion_idx` (`idReservacion`);

--
-- Indices de la tabla `mozos`
--
ALTER TABLE `mozos`
  ADD PRIMARY KEY (`idMozo`),
  ADD KEY `fk_idSector_idx` (`idSector`);

--
-- Indices de la tabla `reservaciones`
--
ALTER TABLE `reservaciones`
  ADD PRIMARY KEY (`idReservacion`);

--
-- Indices de la tabla `sectores`
--
ALTER TABLE `sectores`
  ADD PRIMARY KEY (`idSector`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bebidas`
--
ALTER TABLE `bebidas`
  MODIFY `idBebidas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `carta`
--
ALTER TABLE `carta`
  MODIFY `idMenus` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `comidas`
--
ALTER TABLE `comidas`
  MODIFY `idComida` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `mesas`
--
ALTER TABLE `mesas`
  MODIFY `idMesas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `mozos`
--
ALTER TABLE `mozos`
  MODIFY `idMozo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `reservaciones`
--
ALTER TABLE `reservaciones`
  MODIFY `idReservacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT de la tabla `sectores`
--
ALTER TABLE `sectores`
  MODIFY `idSector` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carta`
--
ALTER TABLE `carta`
  ADD CONSTRAINT `fk_menus_bebidas1` FOREIGN KEY (`idBebidas`) REFERENCES `bebidas` (`idBebidas`),
  ADD CONSTRAINT `fk_menus_comidas1` FOREIGN KEY (`idComidas`) REFERENCES `comidas` (`idComida`);

--
-- Filtros para la tabla `mesas`
--
ALTER TABLE `mesas`
  ADD CONSTRAINT `fk_idReservacion` FOREIGN KEY (`idReservacion`) REFERENCES `reservaciones` (`idReservacion`),
  ADD CONSTRAINT `fk_idSectores` FOREIGN KEY (`idSectores`) REFERENCES `sectores` (`idSector`);

--
-- Filtros para la tabla `mozos`
--
ALTER TABLE `mozos`
  ADD CONSTRAINT `fk_idSector` FOREIGN KEY (`idSector`) REFERENCES `sectores` (`idSector`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
