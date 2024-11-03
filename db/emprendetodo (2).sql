-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-11-2024 a las 23:59:40
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

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
-- Estructura de tabla para la tabla `generos`
--

CREATE TABLE `generos` (
  `pk_genero` int(11) NOT NULL,
  `genero` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `generos`
--

INSERT INTO `generos` (`pk_genero`, `genero`) VALUES
(1, 'Masculino'),
(2, 'Femenino'),
(3, 'Otro');

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
  `email` varchar(60) NOT NULL,
  `fk_provincia` int(11) NOT NULL,
  `fk_localidad` int(11) NOT NULL,
  `fk_genero` int(11) NOT NULL,
  `imagen_dir` varchar(60) NOT NULL,
  `admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`pk_user`, `username`, `password`, `email`, `fk_provincia`, `fk_localidad`, `fk_genero`, `imagen_dir`, `admin`) VALUES
(7, 'marco144545', '$2b$10$Vg.F6Kh4NCahwJGD3REGDePZSAIVffgobkp67e8ZzWYZMf41MwHPe', 'marco.baglieri1@gmail.com', 2, 1, 1, '1730041378111.jpeg', 0),
(8, 'marco', '$2b$10$iA/u7jDJd2.iH7LfOFfXIOx8JWwmSLrQ1kFlySDXmAKjauxzsn/6G', 'marco.baglieri1@gmail.com', 2, 1, 1, 'default_pfp.png', 0),
(9, 'jorge', '$2b$10$NQku3Gt0IL5H22LfPT124OF/G8AvhPk53TpPTrX2o3o/DAnTCyFwq', 'marco.baglieri1@gmail.com', 2, 1, 1, '1730075683334.jpeg', 0),
(10, 'pepe', '$2b$10$fXK9hyPMS0QAtSA.0/9.HeJsSArmi.5i3EK.X.fDRU5QQV76.7Fgm', 'smithmapiel@gmail.com', 2, 1, 1, 'default_pfp.png', 0),
(11, 'Gerardo', '$2b$10$4PLRBOorQ5SL8f6PaV2hnO97uZGEaB/D.bJd3AiEM6l0aYBcS487K', 'marco.baglieri1@gmail.com', 2, 1, 1, '1730671101616.JPG', 1);

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
-- Indices de la tabla `generos`
--
ALTER TABLE `generos`
  ADD PRIMARY KEY (`pk_genero`);

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
-- AUTO_INCREMENT de la tabla `generos`
--
ALTER TABLE `generos`
  MODIFY `pk_genero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  MODIFY `pk_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
