const db = require("../db/db");
const { all } = require("../routers/users_router");

const all_cats = (req, res) => {
    const sql = "SELECT * FROM categorias"
    db.query(sql, (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows); 
    }); 
}

const find_cat = (req, res) => {
    const {categoria} = req.query;
    const sql = "SELECT * FROM categorias WHERE nombre_categoria = ?"
    db.query(sql,[categoria], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe la categoria buscada"});
        };
        res.json(rows[0]); 
    }); 
}


const create_cat = (req, res) => {
    const {categoria} = req.query;
    const sql = "INSERT INTO `categorias`(`nombre_categoria`) VALUES (?)"
    db.query(sql,[categoria], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        const user = {...req.body, categoria}; 
        res.status(201).json(user);
    }); 
}


const update_cat = (req, res) => {
    const {id_categoria} = req.query;
    const {categoria} = req.query;
    const sql = "UPDATE `categorias` SET `nombre_categoria`=? WHERE pk_categoria = ?";
    
    db.query(sql, [categoria, id_categoria], (error, result) => {  
        console.log('ID del usuario:', id_categoria); 
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        
        if (result.length == 0) {  
            return res.status(404).json({error: "ERROR: La categoria a modificar no existe"});
        }
        
        const user = {...req.body, id_categoria, categoria};  
        res.status(201).json(user);
    });
};


const delete_cat = (req, res) => {
    const {id_categoria} = req.query;
    const sql = "DELETE FROM `categorias` WHERE pk_categoria = ?"
    db.query(sql,[id_categoria], (error, rows) => { 
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: La categoria a eliminar no existe"});
        };
        res.json({mesaje : "Categoria Eliminada"});
    }); 
}


module.exports = {
    find_cat,
    delete_cat,
    update_cat,
    create_cat,
    all_cats
};