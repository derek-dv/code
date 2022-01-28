import { MongoClient } from "mongodb";
import { files } from "../../dummy";

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "myProject";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("documents");

  // the following code examples can be pasted here...

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

export default async (req, res) => {
  try {
    await client.connect();
    console.log("Connected");
    const db = client.db(dbName);
    const collection = db.collection("documents");
    res.status(200).send("all good");
  } catch (err) {
    res.status(400).send("error");
  }
};
