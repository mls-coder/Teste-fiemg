const mysql = require('mysql2/promise');

require('dotenv').config();

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'root',
  database: process.env.MYSQL_DB || 'exp-teste',
});

async function createUserTable(){
    query = `CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    )`;

    await connection.execute(query);
}

async function verify(email){
    createUserTable()
    query = `SELECT * FROM users WHERE email = ?`;
    let verify;
    await connection.execute(query, [email]).then(result => {
        [verify] = result[0];
    })
    if(!verify) verify = { id:null }
    return verify;
}

async function createUser(email, password){
    query = `INSERT INTO users (email, password) VALUES (?, ?)`;
    let create;
    await connection.execute(query, [email, password]).then(result => {
        create = result[0];
    });
    return create.insertId;
}

async function changePassword(email,new_password){
    query = `UPDATE users SET password=${new_password} WHERE email=${email}`
    let update;
    await connection.execute(query, [email, password]).then(result => {
        update = result;
    });
    console.log(update)
    return update;
}

module.exports = { createUser, verify ,changePassword};