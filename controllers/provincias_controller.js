const db = require("../db/db");
const { all } = require("../routers/provincias_router");

const all_provincias = (req, res) => {
    const sql = "SELECT * FROM provincias"
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows); 
    }); 
}



const create_provincias = (req, res) => {
    const {nombre_provincia} = req.query;
    const sql = "INSERT INTO `provincias`(`nombre_provincia`) VALUES (?)"
    db.query(sql,[nombre_provincia], (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        const user = {...req.body, nombre_provincia}; 
        res.status(201).json(user);
    }); 
}


const update_provincia = (req, res) => {
    const {id_provincia} = req.query;
    const {nombre_provincia} = req.query;
    const sql = "UPDATE `provincias` SET `nombre_provincia`=? WHERE pk_provincia = ?";
    
    db.query(sql, [nombre_provincia, id_provincia], (error, result) => {  
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        
        if (result.length == 0) {  
            return res.status(404).json({error: "ERROR: La provincia a modificar no existe"});
        }
        
        const user = {...req.body, id_provincia, nombre_provincia};  
        res.status(201).json(user);
    });
};


const delete_provincia = (req, res) => {
    const {id_provincia} = req.query;
    const sql = "DELETE FROM `provincias` WHERE pk_provincia = ?"
    db.query(sql,[id_provincia], (error, rows) => { 
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: La provincia a eliminar no existe"});
        };
        res.json({mesaje : "Provincia Eliminada"});
    }); 
}


module.exports = {
    all_provincias,
    delete_provincia,
    update_provincia,
    create_provincias
};