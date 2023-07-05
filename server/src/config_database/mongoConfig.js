const { MongoClient } = require('mongodb');

require('dotenv').config();
// const url = process.env.MONGO_URL;
const url = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(url);
const database = "Ecommerce_portal"
const db_connect = async (collection) => {
    // console.log("config");
    let result = await client.connect();

    let db = result.db(database);

    // return db.collection(collection);
    const res = db.collection(collection)

    return res
}

module.exports = db_connect;