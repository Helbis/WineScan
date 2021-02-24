const express = require('express');
const server = express();
const http = require('http').Server(server);
const io = require('socket.io')(http);
const mysql = require('mysql');

// Global data
const port = 3000;

// MySQL https://www.npmjs.com/package/mysql#introduction
const sql_db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'Helbis',
    password: 'winescan',
    database: 'WineScan'
});

sql_db.connect(error => {
    if (error) {
        return console.error('error: ' + error.message);
    }

    console.log('Connected to the MySQL server.');
});


// express server
server.use(express.static('./'));       // Use root directory
server.use(express.static('./public')); // Use public directory

server.get('/', (req, res, next) => {
    res.send('./index.html');
    next();
});


http.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});


// Socket IO
io.on('connection', (socket) => {
    console.log('💚\tuser connected');

    socket.on('front2back', (query) => {
        console.log('From user:\n\t' + query);

        sql_db.query(query, (error, results, fields) => {
            if (error) throw error;

            console.table(results);
            socket.emit('back2front', results);
        });
    });

    socket.on('disconnect', () => {
        console.log('🔴\tuser disconnected');
    });
});
