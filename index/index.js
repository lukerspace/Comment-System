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
  // create a db called database
  db = client.db("database");
  console.log("Successfully Connect the DB - database");
});

// express
const express = require("express");
const app = express();
// session
const session = require("express-session");
const { reset } = require("nodemon");
app.use(session({ secret: "nodejs", resave: false, saveUninitialized: true }));
// ejs
app.set("view engine", "ejs");
app.set("views", "./views");
// static
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// route
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/member", async (req, res) => {
  if (!req.session.member) {
    res.redirect("/error?msg=Please LogIn");
    console.log("ERROR - Please_LogIn");
    return;
  }
  const name = req.session.member.name.toUpperCase();
  // Get all the data in database
  const collection = db.collection("member");
  let result = await collection.find({});
  let data = [];
  // Get all the data in collection
  // await result.forEach((user) => {
  //   console.log(user);
  // });
  // Push all the data in collection into Data List
  await result.forEach((member) => {
    data.push(member);
  });
  console.log(data);

  res.render("member.ejs", { name: name, data: data });
});

app.get("/error", (req, res) => {
  const error_msg = req.query.msg;
  res.render("error.ejs", { msg: error_msg });
});

app.post("/signup", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  // check the user if exist already
  // create a collection in DB - database
  const collection = db.collection("member");
  let result = await collection.findOne({ email: email });
  if (result !== null) {
    res.redirect("/error?msg=Email Already Exist");
    console.log("ERROR - Email_already_exist");
    return;
  }
  result = await collection.insertOne({
    name: name,
    email: email,
    password: password,
  });
  console.log("SUCCESS - User_Upload_Successfully");
  res.redirect("/");
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const collection = db.collection("member");
  let result = await collection.findOne({
    $and: [{ email: email }, { password: password }],
  });
  if (result === null) {
    msg = "Password or Account Error";
    res.redirect("/error?msg=" + msg);
    return;
  } else {
    req.session.member = result;
    console.log("Session :", result.name);
    res.redirect("/member");
    console.log("Login Successfully");
  }
});

app.get("/logout", (req, res) => {
  req.session.member = null;
  console.log("Session expired");
  res.redirect("/");
});

// listen
app.listen(3000, () => {
  console.log("Server is Connected....");
});
