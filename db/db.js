const mysql = require("mysql2");

const connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "emprendetodo"
});

connection.connect((error) => {
    if(error){
        return console.error(error);
    }
    console.log("Se conecto a la base de datos");
});

module.exports = connection;