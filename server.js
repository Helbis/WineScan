const express = require('express');
const server = express();
const http = require('http').Server(server);
const io = require('socket.io')(http);
const mysql = require('mysql');
const util = require('util');


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
    if (error) console.error(error);

    console.log('Connected to the MySQL server.');
});

sql_db.query = util.promisify(sql_db.query);


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


// const submition = async (qr) => {
//     temp = await sql_db.query(qr);
// }
// Socket IO
io.on('connection', (socket) => {
    console.log('💚\tuser connected');

    socket.on('front2back', (query) => {
        console.log('From user:\n\t' + query);

        sql_db.query(query, (error, results, fields) => {
            if (error) console.error(error);

            // console.table(results);
            socket.emit('back2front', results);
        });
    });

    socket.on('submition', (data) => {
        // console.table(data);

        let wine_id = null,
            wine_year_id = null,
            bottle_id = null,
            localization_id = null,
            invoice_id = null,
            supplier_id = null,
            taste_id = null,
            style_id = null,
            volumes_id = null,
            variety_id = null;


        const mainSub = async () => {
            temp = await sql_db.query("SELECT id, name AS 'wine_name' FROM Wine;");

            for (let i = 0; i < temp.length; i++) {
                // console.log(temp[i]);
                if (temp[i].wine_name === data.wine_name) {
                    console.log("From inside\t:", temp[i].wine_name === data.wine_name);
                    wine_id = temp[i].id;
                }
            }
            return "Hello";
        };

        mainSub();

        // let a = new Promise(mainSub);
        let b = Promise.resolve(mainSub());
        // console.log(b);
        // console.log("Promise a\t", a.then((val) => {
            // console.log("\t", val);
        // }));
        console.log("Promise b\t", b.then((val) => {
            console.log("\t", val);
            console.log("wine_id: ", wine_id);
        }));

        // Promise.resolve(mainSub()).then((vals) => {
        //     console.log(vals);
        // })
        /* Data looks like
        {
            amount: "500"
            friends: ""
            invoice_note: "Great wine for no reason . . ."
            localization: "Ulanów"
            order_number: "456789145"
            order_price: "12.54"
            price: "30000"
            rating: "5"
            scanned_code: "123456789"
            style: "5"
            supplier_email: "john.doe@xyz.net"
            supplier_name: "John Smith"
            supplier_note: "Well known and respected supplier"
            supplier_phone: "434525686"
            taste: "2"
            variety: "Airen"
            volumes_options: "5"
            wine_description: "jfdklsdjlkajflkdjksa"
            wine_name: "Second"
            wine_photo: ""
            wine_year: "1997"
        }
        */

        // Check wine data
        // if (data.wine_name.length !== 0) {
        //     console.log("Wine:");
        //     // Check if a wine with this name exists
        //     //      if so, check other parameters against it
        //     //      and get id of this wine
        //     sql_db.query("SELECT id, name AS 'wine_name' FROM Wine;", (error, results, fields) => {
        //         if (error) console.error(error);
        //         console.log("Here");
        //
        //         for (let i = 0; i < results.length; i++) {
        //             console.log(results[i].wine_name === data.wine_name);
        //             if (results[i].wine_name === data.wine_name) {
        //                 console.log("\t:", results[i].wine_name === data.wine_name);
        //                 wine_id = results[i].id;
        //             }
        //         }
        //         console.log("Inside : ", wine_id);
        //     });
        //
        //     if (data.wine_description.length === 0) {
        //         console.warn("\tdescription not provided");
        //     } else {
        //
        //     }
        //     if (data.taste.length === 0) {
        //         console.warn("\ttaste not provided");
        //     }
        //     if (data.variety.length === 0) {
        //         console.warn("\tvariety not provided");
        //     }
        //     if (data.style.length === 0) {
        //         console.warn("\tstyle not provided");
        //         return;
        //     }
        //
        //     console.log("\t✅ OK");
        // } else {
        //     console.warn("❌ Wine name not provided");
        //     return;
        // }
        // console.log("Outside : ", wine_id);


        // Check wine year data
        // if (data.wine_year.length === 0) {
        //     console.log("Wine variety not provided");
        //     return;
        // }
        // if (data.wine_photo.length === 0) {
        //     console.log("Wine variety not provided");
        //     return;
        // }
        // if (data.rating.length === 0) {
        //     console.log("Wine variety not provided");
        //     return;
        // }

        // Check bottle data
        // if (data.amount.length === 0) {
        //     console.log("Wine variety not provided");
        //     return;
        // }
        // if (data.price.length === 0) {
        //     console.log("Wine variety not provided");
        //     return;
        // }
        // if (data.volumes_options.length === 0) {
        //     console.log("Wine variety not provided");
        //     return;
        // }
        // if (data.friends.length === 0) {
        //     console.log("Wine variety not provided");
        //     return;
        // }
        // if (data.scanned_code.length === 0) {
        //     console.log("Wine variety not provided");
        //     return;
        // }
        // if (data.localization.length === 0) {
        //     console.log("Wine variety not provided");
        //     return;
        // }

        // Check invoice data
        // if (data.order_number.length === 0) {
        //     console.log("Wine variety not provided");
        //     return;
        // }
        // if (data.order_price.length === 0) {
        //     console.log("Wine variety not provided");
        //     return;
        // }
        // if (data.invoice_note.length === 0) {
        //     console.log("Wine variety not provided");
        //     return;
        // }

        // Check supplier data
        // if (data.supplier_name.length === 0) {
        //     console.log("Wine variety not provided");
        //     return;
        // }
        // if (data.supplier_phone.length === 0) {
        //     console.log("Wine variety not provided");
        //     return;
        // }
        // if (data.supplier_email.length === 0) {
        //     console.log("Wine variety not provided");
        //     return;
        // }
        // if (data.supplier_note.length === 0) {
        //     console.log("Wine variety not provided");
        //     return;
        // }

        // Construct the SQL querry to insert the data
        // Substitute the codes for their entries in the datalists
        // Get ids of specific elements that are constant for the database
        /*
        INSERT INTO Wine(name, description, id_taste, id_variety, id_style)
            VALUES("Kistler Chardonnay Russian River Valley Vine Hill Vineyard 2017", "Complex, with crunchy acidity to the concentrated citrus and McIntosh apple flavors. Intense minerality shows midpalate, followed by a pure and powerful finish that lingers with dried savory herb and toasty hints. Best from 2022 through 2027. 1,979 cases made. —KM", 2, 757, 6);

        INSERT INTO Wine_year(bottling_year, rating, photo, id_wine)
            VALUES("2010", 96, "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Sk1Ua367nGL71JyU9M7JoAAAAA%26pid%3DApi&f=1", 1);

        INSERT INTO Supplier(name, phone_number, email, note)
            VALUES("Marek", "777353535", "Marek@protonmail.com", "Super");

        INSERT INTO Invoice(creation_date, order_number, total_price, note, id_supplier)
            VALUES("2020-01-15", "52", 15, "Clear as day come on light", 7);

        INSERT INTO Bottle(price, id_volume, friends, creation_date, deletion_date, scanned_code, id_localization, id_invoice, id_year)
            VALUES(175.00,  2,  "", "2021-01-16", "2021-01-23", 730920, 11, 6,  13);

        INSERT INTO Localization(name)
            VALUES("Żywiec");
        */
    });

    socket.on('disconnect', () => {
        console.log('💔\tuser disconnected');
    });
});
