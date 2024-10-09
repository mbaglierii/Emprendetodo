const db = require("../db/db");


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
        res.json(rows[0]); 
    }); 
}

module.exports = {
    find_user
};