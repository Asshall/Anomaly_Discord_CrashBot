const express = require('express');
const server = express();

server.all('/', (req, res) => {
  res.send("Node version: "+process.version)
})

function keepAlive() {
  server.listen(3000, () => { console.log("Server is up") });
}

module.exports = keepAlive;
