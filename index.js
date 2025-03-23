const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

// Check DB Connected Or Not
const url =
  "mongodb+srv://gosaviraj66:cy5BaJ2RKEbc0rQm@cluster0.j5pus.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Connect to your Atlas cluster


 /*
async function run() {
  try {
    await client.connect();
    console.log("Successfully connected to Atlas");
  } catch (err) {
    console.log(err.stack);
  } 
} 

run().catch(console.dir);
*/

app.post("/save", (req, res) => {
  const client = new MongoClient(url);
  const db = client.db("fb_19march25");
  const coll = db.collection("student");
  const doc = { name: req.body.name, feedback: req.body.feedback };
  console.log(doc);
  coll
    .insertOne(doc)
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
});

app.listen(11000, () => {
  console.log("ready @ 11000");
});
