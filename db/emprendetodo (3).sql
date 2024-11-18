-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-11-2024 a las 20:09:34
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
  `nombre_categoria` varchar(60) NOT NULL,
  `imagen_dir_categoria` varchar(65) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`pk_categoria`, `nombre_categoria`, `imagen_dir_categoria`) VALUES
(27, 'Alimentos y Bebidas', '1731088468274.png'),
(28, 'Tecnología', 'imagen2'),
(29, 'Ropa y Moda', 'imagen3'),
(30, 'Belleza y Cuidado Personal', 'imagen4'),
(31, 'Salud y Bienestar', 'imagen5'),
(32, 'Electrónica', 'imagen6'),
(33, 'Hogar y Decoración', 'imagen7'),
(34, 'Educación y Cursos', 'imagen8'),
(35, 'Juguetes y Niños', 'imagen9'),
(36, 'Deportes y Aire Libre', 'imagen10'),
(37, 'Automotriz', 'imagen11'),
(38, 'Arte y Cultura', 'imagen12'),
(39, 'Servicios Financieros', 'imagen13'),
(40, 'Servicios de Marketing', 'imagen14'),
(41, 'Fotografía y Video', 'imagen15'),
(42, 'Turismo y Viajes', 'imagen16'),
(43, 'Inmobiliaria', 'imagen17'),
(44, 'Tecnología y Desarrollo', 'imagen18'),
(45, 'Consultoría y Coaching', 'imagen19'),
(46, 'Bodas y Eventos', 'imagen20'),
(47, 'Mascotas y Animales', 'imagen21'),
(48, 'Servicios de Limpieza', 'imagen22'),
(49, 'Construcción y Renovaciones', 'imagen23'),
(50, 'Agricultura y Ganadería', 'imagen24'),
(51, 'Entretenimiento y Medios', 'imagen25');

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
  `fk_localidad` int(11) NOT NULL,
  `imagen_dir_perfil_empren` varchar(60) NOT NULL,
  `descripcion` varchar(300) NOT NULL,
  `telefono` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `emprendimientos`
--

INSERT INTO `emprendimientos` (`pk_emprendimiento`, `nombre_emprendimiento`, `fecha_creacion`, `reviews`, `fk_user`, `fk_localidad`, `imagen_dir_perfil_empren`, `descripcion`, `telefono`) VALUES
(10, 'Nombre emprendimiento', '2024-11-13', 0, 9, 1, '1731496072365.png', 'descripcion emprendimiento', 11232323),
(11, 'adafsdfasdf', '2024-11-14', 0, 9, 1, '1731604787356.png', 'asdfasdf', 11123232);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes_publicaciones_dir`
--

CREATE TABLE `imagenes_publicaciones_dir` (
  `pk_imagen_publicaciones` int(11) NOT NULL,
  `fk_publicacion` int(11) NOT NULL,
  `imagen_dir_publicacion` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `imagenes_publicaciones_dir`
--

INSERT INTO `imagenes_publicaciones_dir` (`pk_imagen_publicaciones`, `fk_publicacion`, `imagen_dir_publicacion`) VALUES
(1, 17, '1731605570325.png'),
(2, 17, '1731605570325.png'),
(3, 18, '1731605675764-c8183e42-9169-4753-9429-8f7bf81328d7.png'),
(4, 18, '1731605675772-d25db91e-ccad-4ca7-bb63-f09b03c3386b.png');

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
  `descripcion` varchar(301) NOT NULL,
  `fk_emprendimiento` int(11) NOT NULL,
  `fecha_publicacion` date NOT NULL DEFAULT current_timestamp(),
  `fk_categoria` int(11) NOT NULL,
  `clicks` int(11) NOT NULL,
  `impresiones` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `publicaciones`
--

INSERT INTO `publicaciones` (`pk_publicacion`, `nombre_publicacion`, `descripcion`, `fk_emprendimiento`, `fecha_publicacion`, `fk_categoria`, `clicks`, `impresiones`) VALUES
(1, 'Publicación Modificada', '', 1, '2024-11-06', 2, 200, 600),
(2, 'Mate paraguayo', '', 1, '2024-10-22', 1, 1, 1),
(5, 'Publicacion Prueba', 'Descripcion prueba', 1, '2024-10-10', 1, 100, 50),
(6, 'Publicacion Prueba', 'Descripcion prueba', 1, '2024-10-10', 1, 100, 50),
(7, 'Publicacion Prueba', 'Descripcion prueba', 1, '2024-10-10', 1, 100, 50),
(8, 'Publicacion Prueba', 'Descripcion prueba', 1, '2024-10-10', 1, 100, 50),
(9, 'Publicacion Prueba', 'Descripcion prueba', 1, '2024-10-10', 1, 100, 50),
(10, 'assdfgsdf', 'sdfgsdfg', 1, '2024-11-14', 27, 0, 0),
(11, 'sdfgsdfg', 'sdfgsdfgsdfg', 1, '2024-11-14', 28, 0, 0),
(12, 'sadfgsdfg', 'sdfgsdfg', 1, '2024-11-14', 28, 0, 0),
(13, 'sdfgsdfg', 'sdfgsdfg', 1, '2024-11-14', 31, 0, 0),
(14, 'asdfasdf', 'asdfasdf', 1, '2024-11-14', 28, 0, 0),
(15, 'fsdgsdfg', 'sdfgsdfg', 1, '2024-11-14', 28, 0, 0),
(16, 'asdf', 'asdfasdf', 1, '2024-11-14', 37, 0, 0),
(17, 'sdfgsdfgsdfg', 'dfgsdfgsdfg', 1, '2024-11-14', 31, 0, 0),
(18, 'asdfgsdfg', 'asdfasdf', 1, '2024-11-14', 28, 0, 0);

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
(8, 'jorge', '$2b$10$.YFckrzReJQUJd.Oa4bXSu1xuBE8WpgdPhVe93RDTTFGhBDgkCVo.', 'marco.baglieri1@gmail.com', 2, 1, 1, '1730561111031.png', 0),
(9, 'admin', '$2b$10$mEqKGxabISBL8kdKAJaDOOzS7Fss/g1ucuYuSQxt9eghQZCb1ojOi', 'marco.baglieri1@gmail.com', 2, 1, 1, '1730569743724.png', 1);

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
-- Indices de la tabla `imagenes_publicaciones_dir`
--
ALTER TABLE `imagenes_publicaciones_dir`
  ADD PRIMARY KEY (`pk_imagen_publicaciones`);

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
  MODIFY `pk_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT de la tabla `emprendimientos`
--
ALTER TABLE `emprendimientos`
  MODIFY `pk_emprendimiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `imagenes_publicaciones_dir`
--
ALTER TABLE `imagenes_publicaciones_dir`
  MODIFY `pk_imagen_publicaciones` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  MODIFY `pk_publicacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `pk_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
