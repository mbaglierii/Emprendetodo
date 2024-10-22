const db = require("../db/db");
const { all } = require("../routers/users_router");



const find_user = (req, res) => {
    const {username, password} = req.query;
    console.log(username, password)
    const sql = "SELECT * FROM users WHERE username = ? and password = ?"
    db.query(sql,[username, password], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe el usuario buscado"});
        };
        res.json(rows); 
    }); 
}


const create_user = (req, res) => {
    const {username, password, fk_provincia, fk_localidad} = req.query;
    console.log(username, password)
    const sql = "INSERT INTO `users`( `username`, `password`, fk_provincia, fk_localidad) VALUES (?,?,?,?)"
    db.query(sql,[username, password, fk_provincia, fk_localidad], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        const user = {...req.body, username, password, fk_localidad, fk_provincia}; 
        res.status(201).json(user);
    }); 
}


const update_password = (req, res) => {
    const {id_user} = req.query;
    const {password} = req.query;
    const sql = "UPDATE `users` SET `password`=? WHERE pk_user = ?";
    
    db.query(sql, [password, id_user], (error, result) => {  
        console.log('ID del usuario:', id_user); 
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        
        if (result.length == 0) {  
            return res.status(404).json({error: "ERROR: El usuario a modificar no existe"});
        }
        
        const user = {...req.body, id_user, password};  
        res.status(201).json(user);
    });
};


const delete_user = (req, res) => {
    const {id_user} = req.query;
    const sql = "DELETE FROM `users` WHERE pk_user = ?"
    db.query(sql,[id_user], (error, rows) => {
        console.log(id_user);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: El usuario a eliminar no existe"});
        };
        res.json({mesaje : "Usuario Eliminada"});
    }); 
}


module.exports = {
    find_user,
    delete_user,
    update_password,
    create_user
};