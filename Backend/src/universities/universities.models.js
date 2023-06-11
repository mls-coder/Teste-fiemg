const { getAllUniversities } = require('../utils/data')
const { formatDate } = require('../utils/formatDate')
const mysql = require('mysql2/promise');

require('dotenv').config();

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'root',
  database: process.env.MYSQL_DB || 'exp-teste',
});


async function createTable() {
  const queries = [
    `DROP TABLE IF EXISTS web_pages`,
    `DROP TABLE IF EXISTS pages`,
    `DROP TABLE IF EXISTS domains`,
    `DROP TABLE IF EXISTS universidades`,
    `CREATE TABLE IF NOT EXISTS universidades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    alpha_two_code VARCHAR(255),
    country VARCHAR(255),
    name VARCHAR(255),
    state_province VARCHAR(255)
    )`,
    `
    CREATE TABLE IF NOT EXISTS domains (
      id INT AUTO_INCREMENT PRIMARY KEY,
      id_uni INT,
      domain VARCHAR(255),
      FOREIGN KEY (id_uni) REFERENCES universidades(id)
    )`,
    `
    CREATE TABLE IF NOT EXISTS pages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      id_uni INT,
      page VARCHAR(255),
      FOREIGN KEY (id_uni) REFERENCES universidades(id)
    )`,
    `
    CREATE TABLE IF NOT EXISTS logs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      date DATETIME
    )
    `]
  
    for (const query of queries) {
      await connection.execute(query);
    }
}

async function saveUniversities() {
  await createTable()
  const universities = await getAllUniversities()
  const query = 'INSERT INTO universidades (name, country, alpha_two_code, state_province) VALUES (?, ?, ?, ?)'
  const query2 = 'INSERT INTO domains (id_uni, domain) VALUES (?, ?)'
  const query3 = 'INSERT INTO pages (id_uni, page) VALUES (?, ?)'
  const queryLog = 'INSERT INTO logs (date) VALUES (?)'
  const updateDate = new Date().toISOString().slice(0, 19).replace('T', ' ')
  
  let arr = [];
  universities.forEach(element => {
    if(element.length > 0){
      arr = arr.concat(element);
    }
  });
  
  Promise.all(arr.map(u => {
    connection.execute(query, [u.name, u.country, u.alpha_two_code, u['state-province']]).then(result => {
        u.domains.map(d => {
          if(d.length > 0) connection.execute(query2, [result[0].insertId, d])
        })
        u.web_pages.map(p => {
          if(p.length > 0) connection.execute(query3, [result[0].insertId, p])
        })
    })
  }))

  connection.execute(queryLog, [updateDate])
}

async function verifyLogs() {
  const query = 'SELECT * FROM logs ORDER BY id DESC LIMIT 1'
  let date
  await connection.execute(query).then(result => {
    [date] = result[0]
  })
 
  return formatDate(date.date)
}

async function getUniversities(limit, offset) {
  const data = await verifyLogs()
  const now = formatDate(new Date())
  if(data !== now) saveUniversities()

  const query = `SELECT id, name, country, state_province FROM universidades LIMIT ${limit} OFFSET ${offset}`
  let res
  await connection.execute(query).then(result => {
    res = result[0]
  })
  return res
}

async function getUniversityById(id) {
  const query = 'SELECT u.id, name, country, alpha_two_code, state_province, domain, page FROM universidades u JOIN domains d ON u.id = d.id_uni JOIN pages p ON u.id = p.id_uni WHERE u.id = ?'
  let res
  await connection.execute(query, [id]).then(result => {
    [res] = result[0]
  })

  return res
}

async function verifyUni(name, state_province, country){
  const query = 'SELECT * FROM universidades WHERE name LIKE ? AND country LIKE ? AND state_province LIKE ?'
  let verify
  await connection.execute(query, [name, country, state_province]).then(result => {
    verify = result[0]
  })
  return verify
}

async function createUniversity(name, country, alpha_two_code, state_province, domains, web_pages) {
  const query = 'INSERT INTO universidades (name, country, alpha_two_code, state_province) VALUES (?, ?, ?, ?)'
  const query2 = 'INSERT INTO domains (id_uni, domain) VALUES (?, ?)'
  const query3 = 'INSERT INTO pages (id_uni, page) VALUES (?, ?)'

  let uniId
  await connection.execute(query, [name, country, alpha_two_code, state_province]).then(result => {
    uniId = result[0].insertId
  })

  Promise.all(domains.map(d => connection.execute(query2, [uniId, d])))
  Promise.all(web_pages.map(wp => connection.execute(query3, [uniId, wp])))
}

async function updateUniversity(id, name, domains, web_pages){
  const query = 'UPDATE universidades SET name = ? WHERE id = ?';
  const query2 = 'UPDATE domains SET domain = ? WHERE id_uni = ?';
  const query3 = 'UPDATE pages SET page = ? WHERE id_uni = ?';
  await connection.execute(query, [name, id])

  Promise.all(domains.map(d => connection.execute(query2, [d, id])))
  Promise.all(web_pages.map(wp => connection.execute(query3, [wp, id])))
}

async function deleteUniversity(id){
  const query = 'DELETE FROM universidades WHERE id = ?';
  await connection.execute(query, [id])
}

async function queryUni(q){
  const query = 'SELECT id, name, country, state_province FROM universidades WHERE country LIKE ?';
  await connection.execute(query, [`${q}%`]).then(result => console.log(result))
}

module.exports = { saveUniversities, getUniversities, getUniversityById, createUniversity, verifyUni, updateUniversity, deleteUniversity, queryUni }