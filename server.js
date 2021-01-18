const express = require('express');
// const server = express();
// const port = 3000;
//
// // MySQL https://www.npmjs.com/package/mysql#introduction
// const mysql = require('mysql');
// let connection = mysql.createConnection({
//     host: 'localhost',
//     port: '3306',
//     user: 'Helbis',
//     password: 'winescan',
//     database: 'WineScan'
// });
//
// connection.connect(error => {
//     if (error) {
//         return console.error('error: ' + error.message);
//     }
//
//     console.log('Connected to the MySQL server.');
// });
//
// connection.query('SELECT * FROM Volumes', (error, results, fields) => {
//     if (error) throw error;
//
//     results.forEach((item, i) => {
//         console.table({'name': item.name, 'volume': item.volume});
//     });
// });
//
// connection.end();
//
// // express server
// server.use(express.static('./'));
// server.use(express.static('./public'));
//
// server.get('/', (req, res, next) => {
//     res.send('./index.html');
//     next();
// });
//
//
// server.listen(port, () => {
//     console.log(`Example server listening at http://localhost:${port}`);
// });


const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('./'));
app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
