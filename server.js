const express = require('express');
const app = express();
const port = 3000;

// MySQL https://www.npmjs.com/package/mysql#introduction
const mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'Helbis',
    password: 'winescan',
    database: 'WineScan'
});

connection.connect(error => {
    if (error) {
        return console.error('error: ' + error.message);
    }

    console.log('Connected to the MySQL server.');
});

connection.query('SELECT * FROM Volumes', (error, results, fields) => {
    if (error) throw error;

    console.table(results[0]);
});

connection.end();

// express server
app.use(express.static('./'));
app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.send('./index.html');
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
