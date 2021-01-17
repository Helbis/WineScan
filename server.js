const express = require('express');
const app = express();
const port = 3000;

// MySQL
const mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'Helbis',
    password: 'winescan',
    database: 'wines'
});

connection.connect(err => {
    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log('Connected to the MySQL server.');
});


// express server
app.use(express.static('./'));
app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.send('./index.html');
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
