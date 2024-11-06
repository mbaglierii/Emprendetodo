const db = require("../db/db");
const { all } = require("../routers/publicaciones_router");

const all_publis = (req, res) => {
    const sql = "SELECT * FROM publicaciones;"
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows); 
    }); 
}

const find_publis = (req, res) => {
    const {busqueda} = req.query;
    const sql = "SELECT * FROM `publicaciones` WHERE nombre_publicacion LIKE ? LIMIT 20;";
    const searchTerm = `%${busqueda}%`;

    db.query(sql, [searchTerm], (error, rows) => {
        if (error) {
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if (rows.length === 0) {
            return res.status(404).send({error : "ERROR: No existe la publicacion buscada"});
        }
        res.json(rows); 
    });
};


const create_public = (req, res) => {
    const {nombre_publicacion, fk_emprendimiento, fecha_publicacion, fk_categoria, clicks, impresiones} = req.query;
    const sql = "INSERT INTO `publicaciones`(`nombre_publicacion`, `fk_emprendimiento`, `fecha_publicacion`, `fk_categoria`, `clicks`, `impresiones`) VALUES (?,?, ?, ?, ?,?)"
    db.query(sql,[nombre_publicacion, fk_emprendimiento, fecha_publicacion, fk_categoria, clicks, impresiones], (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        const user = {...req.body, nombre_publicacion, fk_emprendimiento, fk_categoria}; 
        res.status(201).json(user);
    }); 
}


const update_public = (req, res) => {
    const {id_publicacion} = req.query;
    const {nombre_publicacion, fk_emprendimiento, fecha_publicacion, fk_categoria, clicks, impresiones} = req.query;
    console.log(clicks, impresiones);
    const sql = "UPDATE `publicaciones` SET `nombre_publicacion`=?,`fk_emprendimiento`=?,`fecha_publicacion`=?,`fk_categoria`=?,`clicks`=?,`impresiones`=? WHERE pk_publicacion = ?";
    
    db.query(sql, [nombre_publicacion, fk_emprendimiento, fecha_publicacion, fk_categoria, clicks, impresiones, id_publicacion], (error, result) => {  
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        
        if (result.length == 0) {  
            return res.status(404).json({error: "ERROR: La publicacion a modificar no existe"});
        }
        
        const user = {...req.body, nombre_publicacion, fk_emprendimiento, fecha_publicacion, fk_categoria, clicks, impresiones, id_publicacion};  
        res.status(201).json(user);
    });
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
    all_publis
};