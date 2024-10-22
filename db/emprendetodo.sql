-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-10-2024 a las 21:19:43
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
-- Base de datos: `emprendetodo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `pk_categoria` int(11) NOT NULL,
  `nombre_categoria` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `emprendimientos`
--

CREATE TABLE `emprendimientos` (
  `pk_emprendimiento` int(11) NOT NULL,
  `nombre_emprendimiento` varchar(60) NOT NULL,
  `fecha_creacion` date NOT NULL DEFAULT current_timestamp(),
  `reviews` int(11) NOT NULL,
  `fk_user` int(11) NOT NULL,
  `fk_localidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `emprendimientos`
--

INSERT INTO `emprendimientos` (`pk_emprendimiento`, `nombre_emprendimiento`, `fecha_creacion`, `reviews`, `fk_user`, `fk_localidad`) VALUES
(1, 'Mates', '2024-10-22', 3, 0, 0),
(2, 'Tazas', '2024-10-22', 142, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `localidades`
--

CREATE TABLE `localidades` (
  `pk_localidades` int(11) NOT NULL,
  `nombre_localidad` varchar(60) NOT NULL,
  `fk_provincia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `localidades`
--

INSERT INTO `localidades` (`pk_localidades`, `nombre_localidad`, `fk_provincia`) VALUES
(1, 'Monte Grande', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `provincias`
--

CREATE TABLE `provincias` (
  `pk_provincia` int(11) NOT NULL,
  `nombre_provincia` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `provincias`
--

INSERT INTO `provincias` (`pk_provincia`, `nombre_provincia`) VALUES
(2, 'Buenos Aires'),
(3, 'Formosa'),
(4, 'Corodoba'),
(5, 'Tucuman');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicaciones`
--

CREATE TABLE `publicaciones` (
  `pk_publicacion` int(11) NOT NULL,
  `nombre_publicacion` varchar(60) NOT NULL,
  `fk_emprendimiento` int(11) NOT NULL,
  `fecha_publicacion` date NOT NULL DEFAULT current_timestamp(),
  `fk_categoria` int(11) NOT NULL,
  `clicks` int(11) NOT NULL,
  `impresiones` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `publicaciones`
--

INSERT INTO `publicaciones` (`pk_publicacion`, `nombre_publicacion`, `fk_emprendimiento`, `fecha_publicacion`, `fk_categoria`, `clicks`, `impresiones`) VALUES
(1, 'Mate Argentino', 1, '2024-10-22', 1, 0, 0),
(2, 'Mate paraguayo', 1, '2024-10-22', 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `pk_user` int(11) NOT NULL,
  `username` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `fk_provincia` int(11) NOT NULL,
  `fk_localidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`pk_user`, `username`, `password`, `fk_provincia`, `fk_localidad`) VALUES
(3, 'ads', '123', 0, 0),
(4, 'ads', '234234', 0, 0),
(5, 'marco', 'contra123', 0, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`pk_categoria`);

--
-- Indices de la tabla `emprendimientos`
--
ALTER TABLE `emprendimientos`
  ADD PRIMARY KEY (`pk_emprendimiento`);

--
-- Indices de la tabla `localidades`
--
ALTER TABLE `localidades`
  ADD PRIMARY KEY (`pk_localidades`);

--
-- Indices de la tabla `provincias`
--
ALTER TABLE `provincias`
  ADD PRIMARY KEY (`pk_provincia`);

--
-- Indices de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD PRIMARY KEY (`pk_publicacion`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`pk_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `pk_categoria` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `emprendimientos`
--
ALTER TABLE `emprendimientos`
  MODIFY `pk_emprendimiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `localidades`
--
ALTER TABLE `localidades`
  MODIFY `pk_localidades` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `provincias`
--
ALTER TABLE `provincias`
  MODIFY `pk_provincia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  MODIFY `pk_publicacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `pk_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
