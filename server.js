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
    sql_db.query('SHOW TABLES;', (error, results, fields) => {
        if (error) console.error(error);

        // console.table(results);
    });
});


// express server
server.use(express.static('./'));       // Use root directory
server.use(express.static('./public')); // Use public directory
server.use(express.static('/home/helbis/Documents/TCS/WineScan/node_modules/socket.io/client-dist')); // Dirty fix for socket.io

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

    socket.on('submition', (msg) => {
        console.table(msg);

            // { // Data looks like:
            //     amount: "500"
            //     friends: ""
            //     invoice_note: "Great wine for no reason . . ."
            //     localization: "Ulanów"
            //     order_number: "456789145"
            //     order_price: "12.54"
            //     price: "30000"
            //     rating: "5"
            //     scanned_code: "123456789"
            //     style: "5"
            //     supplier_email: "john.doe@xyz.net"
            //     supplier_name: "John Smith"
            //     supplier_note: "Well known and respected supplier"
            //     supplier_phone: "434525686"
            //     taste: "2"
            //     variety: "Airen"
            //     volumes_options: "5"
            //     wine_description: "jfdklsdjlkajflkdjksa"
            //     wine_name: "Second"
            //     wine_photo: ""
            //     wine_year: "1997"
            // }
    });

    socket.on('disconnect', () => {
        console.log('💔\tuser disconnected');
    });
});
