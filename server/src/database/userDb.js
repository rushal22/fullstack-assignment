const db_connect = require("../config_database/mongoConfig");
const mongodb = require("mongodb");
const Bcrypt = require("bcrypt");

async function get_user_data() {
  let con = await db_connect("users");
  const data = await con.find().toArray();
  return data;
}

async function add_user(user) {
  try {
    let con = await db_connect("users");
    const data = await con.insertOne(user);
    return data.acknowledged;
  } catch (error) {
    throw e;
  }
}
async function find_user_from_email(email) {
  try {
    let con = await db_connect("users");
    let user = await con.findOne({ email: email });
    if (user) {
      return user;
    }
    return false;
  } catch (e) {
    throw e;
  }
}

async function find_user_from_login_details(email, password) {
  try {
    let con = await db_connect("users");
    let user = await con.findOne({ email: email });
    //  console.log(user);
    if (user) {
      if (Bcrypt.compareSync(password, user.password)) {
        return user;
      }
    }
    throw new Error("Invalid login Credentials");
  } catch (e) {
    throw e;
  }
}

async function get_user_by_id(id) {
  try {
    let con = await db_connect("users");
    let user = await con.findOne({ _id: new mongodb.ObjectId(id)});
    if (user) {
      return user;
    }
    return false;
  } catch (e) {
    throw e;
  }
}

module.exports = {
  get_user_data,
  add_user,
  find_user_from_email,
  get_user_by_id,
  find_user_from_login_details,
};
