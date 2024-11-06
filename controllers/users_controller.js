const db = require("../db/db");
const { all } = require("../routers/users_router");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function encryptPassword(password) {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}


const all_users = (req, res) => {
    const sql = "SELECT * FROM users"
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe el usuario buscado"});
        };
        res.json(rows); 
    }); 
}

const find_user = async (req, res) => {
    const {username, password} = req.body;
    console.log(username, password)
    
    const sql = "SELECT * FROM users WHERE username = ?"
    db.query(sql,[username], async (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }

        const user = rows[0]; 

        if (!user) {
            return res.status(404).json({ error: "ERROR: No existe el usuario buscado" });
        }
        if(!password){
            return res.status(404).json({ error: "ERROR: Debe ingresar una contraseña" });
        }

        const password_encriptada = user.password;
        const match = await bcrypt.compare(password, password_encriptada);

        if(match){
            const token = jwt.sign({ userId: user.id }, process.env.S_KEY, { expiresIn: "1h" });
            if(user.admin == 1){
                console.log("Ingreso un admin");
                const token_admin = jwt.sign({ userId: user.id }, process.env.S_KEY_ADMIN, { expiresIn: "1h" });    
                res.json({
                    user: user,
                    token: token,
                    token_admin: token_admin
                });
            }else{
                res.json({
                    user: user,
                    token: token
                });
            }
            }else{
            return res.status(400).json({ error: "Contraseña incorrecta" });
        }
        
    }); 
}


const create_user = async (req, res) => {
    var pfp = 'default_pfp.png'
    if(req.file){
        pfp = req.file.filename
    }
    const {username, email, password, fk_provincia, fk_localidad, fk_genero} = req.body;
    console.log(username, email, password, fk_provincia, fk_localidad, fk_genero, pfp);
    if(password.length < 8){
        return res.status(400).json({error : "ERROR: La contraseña debe terner 8 caracteres"});
    }
    const checkUserSql = "SELECT * FROM users WHERE username = ?";
    db.query(checkUserSql, [username], async (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }

        if (rows.length > 0) {
            return res.status(409).json({ error: "ERROR: El nombre de usuario ya está en uso" });
        }

        const password_encriptada = await encryptPassword(password);
        console.log(username, password);

        const sql = "INSERT INTO `users`(`username`, `password`, `fk_provincia`, `fk_localidad`, `fk_genero`, `imagen_dir`, email, admin) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        db.query(sql, [username, password_encriptada, fk_provincia, fk_localidad, fk_genero, pfp, email, 0], (error, rows) => {
            if (error) {
                return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
            }
            const user = { ...req.body, username, fk_localidad, fk_provincia }; 
            res.status(201).json(user);
        });
    });
}


const update_user = async (req, res) => {
    const {username, password, email, fk_provincia, fk_localidad, fk_genero, imagen_dir, admin, pk_user} = req.query;
    var sql = "UPDATE `users` SET `username`=?,`password`=?,`email`=?,`fk_provincia`=?,`fk_localidad`=?,`fk_genero`=?,`imagen_dir`=?,`admin`= ? WHERE pk_user = ?";
    if(password === ""){
        sql = "UPDATE `users` SET `username`=?,`email`=?,`fk_provincia`=?,`fk_localidad`=?,`fk_genero`=?,`imagen_dir`=?,`admin`= ? WHERE pk_user = ?";
        db.query(sql, [username, email, fk_provincia, fk_localidad, fk_genero, imagen_dir, admin, pk_user], (error, result) => {  
            if (error) {
                return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
            }
            
            if (result.length == 0) {  
                return res.status(404).json({error: "ERROR: El usuario a modificar no existe"});
            }
            
            const user = {...req.body, pk_user, username, password, email, fk_provincia, fk_localidad, fk_genero, imagen_dir, admin};  
            res.status(201).json(user);
        });
    }else{
        console.log(password);
        const password_encriptada = await encryptPassword(password);
        console.log(password_encriptada);
        db.query(sql, [username, password_encriptada, email, fk_provincia, fk_localidad, fk_genero, imagen_dir, admin, pk_user], (error, result) => {  
            if (error) {
                console.log(error);
                return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
            }
            
            if (result.length == 0) {  
                return res.status(404).json({error: "ERROR: El usuario a modificar no existe"});
            }
            
            const user = {...req.body, pk_user, username, password, email, fk_provincia, fk_localidad, fk_genero, imagen_dir, admin};  
            res.status(201).json(user);
        });
    }
    
    
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
    update_user,
    create_user,
    all_users
};