const db = require("../db/db");
const { all } = require("../routers/publicaciones_router");

const all_publis = (req, res) => {
    const sql = `
        SELECT 
            p.pk_publicacion,
            p.nombre_publicacion,
            p.descripcion,
            p.fk_emprendimiento,
            p.fecha_publicacion,
            p.fk_categoria,
            p.clicks,
            p.impresiones,
            i.imagen_dir_publicacion
        FROM 
            publicaciones p
        LEFT JOIN 
            imagenes_publicaciones_dir i 
        ON 
            p.pk_publicacion = i.fk_publicacion
    `;
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        const publicaciones = rows.reduce((acc, row) => {
            const { pk_publicacion, imagen_dir_publicacion, ...publicacionData } = row;

            if (!acc[pk_publicacion]) {
                acc[pk_publicacion] = {
                    ...publicacionData,
                    pk_publicacion,
                    imagenes: [],
                };
            }

            if (imagen_dir_publicacion) {
                acc[pk_publicacion].imagenes.push(imagen_dir_publicacion);
            }

            return acc;
        }, {});

        res.json(Object.values(publicaciones));
    }); 
}

const find_publis = (req, res) => {
    const { busqueda } = req.query;
    const sql = `
        SELECT 
            p.pk_publicacion,
            p.nombre_publicacion,
            p.descripcion,
            p.fk_emprendimiento,
            p.fecha_publicacion,
            p.fk_categoria,
            p.clicks,
            p.impresiones,
            i.imagen_dir_publicacion
        FROM 
            publicaciones p
        LEFT JOIN 
            imagenes_publicaciones_dir i 
        ON 
            p.pk_publicacion = i.fk_publicacion
        WHERE 
            p.nombre_publicacion LIKE ?
        LIMIT 20;
    `;
    const searchTerm = `%${busqueda}%`;

    db.query(sql, [searchTerm], (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (rows.length === 0) {
            return res.status(404).json({ error: "ERROR: No existe la publicación buscada" });
        }

        const publicaciones = rows.reduce((acc, row) => {
            const { pk_publicacion, imagen_dir_publicacion, ...publicacionData } = row;

            if (!acc[pk_publicacion]) {
                acc[pk_publicacion] = {
                    ...publicacionData,
                    pk_publicacion,
                    imagenes: [],
                };
            }

            if (imagen_dir_publicacion) {
                acc[pk_publicacion].imagenes.push(imagen_dir_publicacion);
            }

            return acc;
        }, {});

        res.json(Object.values(publicaciones));
    });
};


const find_publis_by_cat = (req, res) => {
    const { id_categoria } = req.query;
    const sql = `
        SELECT 
            p.pk_publicacion,
            p.nombre_publicacion,
            p.descripcion,
            p.fk_emprendimiento,
            p.fecha_publicacion,
            p.fk_categoria,
            p.clicks,
            p.impresiones,
            i.imagen_dir_publicacion
        FROM 
            publicaciones p
        LEFT JOIN 
            imagenes_publicaciones_dir i 
        ON 
            p.pk_publicacion = i.fk_publicacion
        left join 
        	categorias c
		ON
        	p.fk_categoria = c.pk_categoria
        WHERE 
            p.fk_categoria = ?
        LIMIT 20;
    `;
    const searchTerm = `${id_categoria}`;

    db.query(sql, [searchTerm], (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }

        const publicaciones = rows.reduce((acc, row) => {
            const { pk_publicacion, imagen_dir_publicacion, ...publicacionData } = row;

            if (!acc[pk_publicacion]) {
                acc[pk_publicacion] = {
                    ...publicacionData,
                    pk_publicacion,
                    imagenes: [],
                };
            }

            if (imagen_dir_publicacion) {
                acc[pk_publicacion].imagenes.push(imagen_dir_publicacion);
            }

            return acc;
        }, {});

        res.json(Object.values(publicaciones));
    });
};

const find_publication = (req, res) => {
    const {pk_publicacion} = req.query;
    const sql = `
        SELECT 
            p.pk_publicacion,
            p.nombre_publicacion,
            p.descripcion,
            p.fk_emprendimiento,
            p.fecha_publicacion,
            p.fk_categoria,
            p.clicks,
            p.impresiones,
            i.imagen_dir_publicacion,
            e.nombre_emprendimiento
        FROM 
            publicaciones p
        LEFT JOIN
            emprendimientos e
        on
            e.pk_emprendimiento = p.fk_emprendimiento
        LEFT JOIN 
            imagenes_publicaciones_dir i 
        ON 
            p.pk_publicacion = i.fk_publicacion
        WHERE 
            p.pk_publicacion = ?
    `;
    const searchTerm = pk_publicacion;

    db.query(sql, [searchTerm], (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (rows.length === 0) {
            return res.status(404).json({ error: "ERROR: No existe la publicación buscada" });
        }

        const publicaciones = rows.reduce((acc, row) => {
            const { pk_publicacion, imagen_dir_publicacion, ...publicacionData } = row;

            if (!acc[pk_publicacion]) {
                acc[pk_publicacion] = {
                    ...publicacionData,
                    pk_publicacion,
                    imagenes: [],
                };
            }

            if (imagen_dir_publicacion) {
                acc[pk_publicacion].imagenes.push(imagen_dir_publicacion);
            }

            return acc;
        }, {});

        res.json(Object.values(publicaciones));
    });
};

const create_public = (req, res) => {
    const { nombre_publicacion, descripcion, fk_emprendimiento, fecha_publicacion, fk_categoria, clicks, impresiones } = req.body;

    const sql = "INSERT INTO `publicaciones`(`nombre_publicacion`, `descripcion`, `fk_emprendimiento`, `fecha_publicacion`, `fk_categoria`, `clicks`, `impresiones`) VALUES (?,?,?,?,?,?,?)";
    console.log(nombre_publicacion, descripcion, fk_emprendimiento, fecha_publicacion, fk_categoria, clicks, impresiones );
    db.query(sql, [nombre_publicacion, descripcion, fk_emprendimiento, fecha_publicacion, fk_categoria, clicks, impresiones], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }

        const pk_publicacion = result.insertId;

        if (req.files && req.files.length > 0) {

            const insertImageQueries = req.files.map(file => {
                const imagePath = file.filename; 
                console.log(imagePath);
                const insertImageSQL = "INSERT INTO `imagenes_publicaciones_dir`(`fk_publicacion`, `imagen_dir_publicacion`) VALUES (?, ?)";
                return db.promise().query(insertImageSQL, [pk_publicacion, imagePath]);
            });

            Promise.all(insertImageQueries)
                .then(() => {
                    const user = { ...req.body, nombre_publicacion, fk_emprendimiento, fk_categoria };
                    res.status(201).json(user);
                })
                .catch((error) => {
                    res.status(500).json({ error: "Error al guardar las imágenes" });
                });
        } else {
            const user = { ...req.body, nombre_publicacion, fk_emprendimiento, fk_categoria };
            res.status(201).json(user);
        }
    });
};



const update_public = (req, res) => {
    const { id_publicacion } = req.query;
    const { nombre_publicacion, descripcion, fk_emprendimiento, fecha_publicacion, fk_categoria, clicks, impresiones } = req.query;

    if (req.files && req.files.length > 0) {
        const deleteSql = "DELETE FROM `imagenes_publicaciones_dir` WHERE `fk_publicacion` = ?";
        db.query(deleteSql, [id_publicacion], (deleteError, deleteResult) => {
            if (deleteError) {
                console.log("Error al eliminar las imágenes anteriores:", deleteError);
                return res.status(500).json({ error: "ERROR al eliminar las imágenes anteriores." });
            }

            req.files.forEach((file) => {
                const insertSql = "INSERT INTO `imagenes_publicaciones_dir` (`fk_publicacion`, `imagen_dir_publicacion`) VALUES (?, ?)";
                db.query(insertSql, [id_publicacion, file.filename], (insertError, insertResult) => {
                    if (insertError) {
                        console.log("Error al subir una nueva imagen:", insertError);
                        return res.status(500).json({ error: "ERROR al subir las nuevas imágenes." });
                    }
                });
            });

            const sql = "UPDATE `publicaciones` SET `nombre_publicacion`=?, `descripcion`=?, `fk_emprendimiento`=?, `fecha_publicacion`=?, `fk_categoria`=?, `clicks`=?, `impresiones`=? WHERE `pk_publicacion` = ?";
            db.query(sql, [nombre_publicacion, descripcion, fk_emprendimiento, fecha_publicacion, fk_categoria, clicks, impresiones, id_publicacion], (updateError, updateResult) => {
                if (updateError) {
                    console.log("Error al actualizar la publicación:", updateError);
                    return res.status(500).json({ error: "ERROR al actualizar la publicación." });
                }

                if (updateResult.length === 0) {
                    return res.status(404).json({ error: "La publicación a modificar no existe." });
                }

                const updatedData = { ...req.body, nombre_publicacion, fk_emprendimiento, fecha_publicacion, fk_categoria, clicks, impresiones, id_publicacion };
                res.status(200).json(updatedData);
            });
        });
    } else {
        const sql = "UPDATE `publicaciones` SET `nombre_publicacion`=?, `descripcion`=?, `fk_emprendimiento`=?, `fecha_publicacion`=?, `fk_categoria`=?, `clicks`=?, `impresiones`=? WHERE `pk_publicacion` = ?";
        db.query(sql, [nombre_publicacion, descripcion, fk_emprendimiento, fecha_publicacion, fk_categoria, clicks, impresiones, id_publicacion], (error, result) => {
            if (error) {
                console.log("Error al actualizar la publicación sin imágenes:", error);
                return res.status(500).json({ error: "ERROR al actualizar la publicación." });
            }

            if (result.length === 0) {
                return res.status(404).json({ error: "La publicación a modificar no existe." });
            }

            const updatedData = { ...req.body, nombre_publicacion, fk_emprendimiento, fecha_publicacion, fk_categoria, clicks, impresiones, id_publicacion };
            res.status(200).json(updatedData);
        });
    }
};



const delete_publi = (req, res) => {
    const {id_publicacion} = req.query;
    const sql = "DELETE FROM `publicaciones` WHERE pk_publicacion = ?"
    db.query(sql,[id_publicacion], (error, rows) => { 
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: La publicacion a eliminar no existe"});
        };
        res.json({mesaje : "Publicacion Eliminada"});
    }); 
}


module.exports = {
    find_publis,
    delete_publi,
    update_public,
    create_public,
    all_publis,
    find_publication,
    find_publis_by_cat
};