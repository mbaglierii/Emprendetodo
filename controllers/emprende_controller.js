const db = require("../db/db");
const { all } = require("../routers/localidades_router");

const all_emprendimientos = (req, res) => {
    const sql = "SELECT * FROM emprendimientos"
    db.query(sql, (error, rows) => {
        
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows); 
    }); 
}

const find_emprendimientos = (req, res) => {
    const {emprendimiento} = req.query;
    const sql = "SELECT * FROM emprendimientos WHERE pk_emprendimiento = ?"
    db.query(sql,[emprendimiento], (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe el emprendimiento buscado"});
        };
        res.json(rows[0]);
    });
}


const create_emprendimiento = (req, res) => {
    var cat_image = "";
    if(req.file){
        cat_image = req.file.filename
    }
    const {nombre_emprendimiento, fecha_creacion, reviews, fk_user, fk_localidad, descripcion, telefono} = req.body;

    console.log(nombre_emprendimiento, fecha_creacion, reviews, fk_user, fk_localidad, descripcion, telefono, cat_image);
    const sql = "INSERT INTO `emprendimientos`(`nombre_emprendimiento`, `fecha_creacion`, `reviews`, `fk_user`, `fk_localidad`, imagen_dir_perfil_empren, descripcion, telefono) VALUES (?,?,?,?,?,?,?,?)"
    db.query(sql,[nombre_emprendimiento, fecha_creacion, reviews, fk_user, fk_localidad, cat_image, descripcion, telefono], (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        const emprendimientoId = rows.insertId;
        const user = {...req.body, emprendimientoId, nombre_emprendimiento, fecha_creacion, reviews, fk_user, fk_localidad}; 
        res.status(201).json(user);
    }); 
}


const update_emprendemiento = (req, res) => {
    var cat_image = "";
    if(req.file){
        cat_image = req.file.filename
        const {nombre_emprendimiento, fecha_creacion, reviews, fk_user, fk_localidad, descripcion, telefono, pk_emprendimiento} = req.body;
        const sql = "UPDATE `emprendimientos` SET `nombre_emprendimiento`=?,`fecha_creacion`=?,`reviews`=?,`fk_user`=?,`fk_localidad`= ? , imagen_dir_perfil_empren = ?, descripcion = ? , telefono= ? WHERE pk_emprendimiento = ?";
        db.query(sql, [nombre_emprendimiento,fecha_creacion,  reviews, fk_user, fk_localidad,cat_image,  descripcion, telefono, pk_emprendimiento], (error, result) => {  
            if (error) {
                console.log(error);
                return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
            }
            
            const user = {...req.body, pk_emprendimiento,nombre_emprendimiento, reviews};  
            res.status(201).json(user);
        });
    }else{
        const {nombre_emprendimiento, fecha_creacion, reviews, fk_user, fk_localidad, descripcion, telefono, pk_emprendimiento} = req.body;
        const sql = "UPDATE `emprendimientos` SET `nombre_emprendimiento`=?,`fecha_creacion`=?,`reviews`=?,`fk_user`=?,`fk_localidad`= ? , descripcion = ? , telefono= ? WHERE pk_emprendimiento = ?";
        db.query(sql, [nombre_emprendimiento,fecha_creacion,  reviews, fk_user, fk_localidad,  descripcion, telefono, pk_emprendimiento], (error, result) => {  
            if (error) {
                console.log(error);
                return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
            }
            
            const user = {...req.body, pk_emprendimiento,nombre_emprendimiento, reviews};  
            res.status(201).json(user);
        });
    }
    
};


const delete_emprendimiento = (req, res) => {
    const {id_emprendimiento} = req.query;
    const sql = "DELETE FROM `emprendimientos` WHERE pk_emprendimiento = ?"
    db.query(sql,[id_emprendimiento], (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: El emprendimiento a eliminar no existe"});
        };
        res.json({mesaje : "Emprendimiento Eliminado"});
    }); 
}


module.exports = {
    find_emprendimientos,
    delete_emprendimiento,
    update_emprendemiento,
    create_emprendimiento,
    all_emprendimientos
};