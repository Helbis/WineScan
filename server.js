const express = require('express');
const server = express();
const port = 3000;


// server.use(express.static('.'));
// server.use(express.static('./src/components'));


server.get('/', (req, res) => {
    // res.send('./index.html');

    res.format({
        'text/plain': () => {
            res.send('hey');
        },

        'text/html': () => {
            res.send('<p>hey</p>');
        },

        'application/json': () => {
            res.send({
                message: 'hey'
            });
        },

        default: function() {
            // log the request and respond with 406
            res.status(406).send('Not Acceptable');
        }
    });
});

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
