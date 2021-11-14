const url =
  "mongodb+srv://root:0000@server.pxr8q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const mongo = require("mongodb");
const client = mongo.MongoClient(url);
client.connect(async (err) => {
  if (err) {
    console.log("Connection Fail....");
  }
  console.log("Connection Success...Listening");

  let db = client.db("database");
  let collection = db.collection("member");
  await collection.insertOne({ email: "lukerspace6" });
  console.log("Update Success");
  client.close();
});
