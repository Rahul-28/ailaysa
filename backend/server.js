const http = require("http");
const express = require("./rest");

const server = http.createServer(express);

console.log("your server is ready at http://localhost:3000/");

server.listen(3000);
