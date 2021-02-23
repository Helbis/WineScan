const express = require('express');
const server = express();
const http = require('http').Server(server);
const io = require('socket.io')(http);
const mysql = require('mysql');


const port = 3000;
let sqlResult;

// MySQL https://www.npmjs.com/package/mysql#introduction
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

    console.table(results);
    sqlResult = results;
});

connection.end();

// express server
server.use(express.static('./'));
server.use(express.static('./public'));

server.get('/', (req, res, next) => {
    res.send('./index.html');
    next();
});


http.listen(port, () => {
    console.log(`Example server listening at http://localhost:${port}`);
});


// Socket IO
io.on('connection', (socket) => {
    console.log('😄\tuser connected');

    socket.broadcast.emit('back2front', sqlResult);

    socket.on('front2back', (msg) => {
        console.log('\t\t' + msg);
    });

    socket.on('disconnect', () => {
        console.log('😲\tuser disconnected');
    });
});


// Quagga
// const Quagga = require('quagga').default;
//
// Quagga.decodeSingle({
//     src: "./public/images/blanc_small_100x163.jpg",
//     numOfWorkers: 0,  // Needs to be 0 when used within node
//     inputStream: {
//         size: 800  // restrict input-size to be 800px in width (long-side)
//     },
//     decoder: {
//         readers: ["code_128_reader"] // List of active readers
//     },
// }, function(result) {
//     if (result) {
//         console.log(result);
//         if(result.codeResult) {
//             console.log("result", result.codeResult.code);
//         } else {
//             console.log("not detected");
//         }
//     }
// });
