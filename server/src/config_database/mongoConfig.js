const { MongoClient } = require("mongodb");
require("dotenv").config();


const url = process.env.MONGO_URL;
const client = new MongoClient(url);
const database = "Ecommerce_books";
const db_connect = async (collection) => {
  let result = await client.connect();
  let db = result.db(database);
  const res = db.collection(collection);
  return res;
};

module.exports = db_connect;
