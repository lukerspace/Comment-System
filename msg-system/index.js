// db
const mongo = require("mongodb");
const url =
  "mongodb+srv://root:0000@server.pxr8q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new mongo.MongoClient(url);
let db = null;
client.connect(async (err) => {
  if (err) {
    console.log("Error on DB Connection - ", err);
    return;
  }
  db = client.db("database");
  console.log("Successfully Connect the DB");
});

// express
const express = require("express");
const app = express();
// session
const session = require("express-session");
app.use(session({ secret: "nodejs", resave: false, saveUninitialized: true }));
// ejs
app.set("view engine", "ejs");
app.set("views", "./views");
// static
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// listen
app.listen(3000, () => {
  console.log("SERVER IS CONNECTED");
});
