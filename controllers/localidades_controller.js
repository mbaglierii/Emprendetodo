const db = require("../db/db");
const { all } = require("../routers/localidades_router");

const all_localidades = (req, res) => {
    const sql = "SELECT * FROM localidades"
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows); 
    }); 
}

const find_localidades = (req, res) => {
    const {fk_provincia} = req.query;
    const sql = "SELECT * FROM localidades WHERE fk_provincia = ?"
    db.query(sql,[fk_provincia], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe la categoria buscada"});
        };
        res.json(rows);
    }); 
}


const create_localidad = (req, res) => {
    const {nombre_localidad, fk_provincia} = req.query;
    const sql = "INSERT INTO `localidades`(`nombre_localidad`, fk_provincia) VALUES (?, ?)"
    db.query(sql,[nombre_localidad, fk_provincia], (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        const user = {...req.body, nombre_localidad, fk_provincia}; 
        res.status(201).json(user);
    }); 
}


const update_localidad = (req, res) => {
    const {id_localidad} = req.query;
    const {nombre_localidad, fk_provincia} = req.query;
    const sql = "UPDATE `localidades` SET `nombre_localidad`=?, fk_provincia = ? WHERE pk_localidades = ?";
    
    db.query(sql, [nombre_localidad, fk_provincia, id_localidad], (error, result) => {  
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        
        if (result.length == 0) {  
            return res.status(404).json({error: "ERROR: La categoria a modificar no existe"});
        }
        
        const user = {...req.body, id_localidad, nombre_localidad, fk_provincia};  
        res.status(201).json(user);
    });
};


const delete_localidad = (req, res) => {
    const {id_localidad} = req.query;
    const sql = "DELETE FROM `localidades` WHERE pk_localidades = ?"
    db.query(sql,[id_localidad], (error, rows) => { 
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: La categoria a eliminar no existe"});
        };
        res.json({mesaje : "Localidad Eliminada"});
    }); 
}


module.exports = {
    find_localidades,
    delete_localidad,
    update_localidad,
    create_localidad,
    all_localidades
};