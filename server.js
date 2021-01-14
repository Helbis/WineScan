const express = require('express');
const server = express();
const port = 3000;


server.use(express.static('.'));


server.get('/', (req, res) => {
  res.send('./index.html');
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
