const express = require("express")
const app = express()
const mysql= require("mysql")
const cors = require("cors")
const bodyParser = require("body-parser");
 
app .use(bodyParser.json());
 
 
const db = mysql.createConnection(
    {      
     user:"root",
    host:"127.0.0.1",
    password:"",
    database:"fogado",
    port:3307
    }
);
 
app.get("/", (req, res) => {
    res.send("Futás");
})
app.get('/adatok', (req, res) => {
    const sql = 'SELECT sznev, agy FROM szobak';
    db.query(sql, (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});

// b) Szobák kihasználtsága
app.get('/adatok2', (req, res) => {
    const sql = `
        SELECT s.sznev, COUNT(f.vendeg) AS vendegek, SUM(DATEDIFF(f.tav, f.erk)) AS vendegejszakak
        FROM szobak s
        JOIN foglalasok f ON s.szazon = f.szoba
        GROUP BY s.sznev
        ORDER BY vendegejszakak ASC, vendegek ASC
    `;
    db.query(sql, (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});




app.listen(3001, () => {
    console.log("3001");
});