const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb',
    insecureAuth: true
};
const mysql = require('mysql2')
const connection = mysql.createConnection(config)

const create = `CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key(id))`
connection.query(create)


const sql = `INSERT INTO people(name) values('Wesley')`
connection.query(sql)


const select = `SELECT name FROM people LIMIT 1`
var name = ''
connection.query(select, (err, results, fields) => {
    name = results[0]['name']
})

connection.end()

app.get('/', (req,res) => {
    res.send('<h1>Full Cycle </h1>' + '<h2>Nome: ' + name + '</h2>')
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})