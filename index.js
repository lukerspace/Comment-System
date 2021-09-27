// path module
const path = require("path");
var pathObj = path.parse(__filename);
console.log(pathObj);

// os module
const os = require("os");
var memory = os.totalmem();
console.log(memory);

// file module
const fs = require("fs");

const file = fs.readdirSync("./");
console.log(file);

fs.readdir("./", (err, files) => {
  if (err) console.log("ERROR", err);
  else console.log("RESULT", files);
});

// // event module
// create class and emitter
const EventEmitter = require("events");
const emitter = new EventEmitter();
// register a listener
// if listening msg logged....
emitter.on("msg logged", (e) => {
  console.log("callback listener is called", e);
});
// raise event
emitter.emit("msg logged", { id: 1, url: "http://" });

//http module
// 1. socket

// const http = require("http");
// const server = http.createServer();
// server.on("connection", (socket) => {
//   console.log("NEW SOCKET CONNECTION...", socket);
// });
// server.listen(3000);
// console.log("HTTP MODULE LISTENING PORT 3000");

// 2. req,res

const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("YESSIR");
    res.end();
  }
  if (req.url === "/api/test") {
    res.write(JSON.stringify([1, 3, 5]));
    res.end();
  }
});
server.listen(3000);
console.log("HTTP MODULE LISTENING PORT 3000");
