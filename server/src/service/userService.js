const UserDb = require("../database/userDb");
const Schema = require("../models/userModel");

const sign_up = async (firstName, lastName, email, password, contact) => {
  try {
    const user = Schema.user_model(
      firstName,
      lastName,
      email,
      password,
      contact
    );
    if (await UserDb.find_user_from_email(user.email)) {
      throw new Error("email already exist");
    }
    if (await UserDb.add_user(user)) {
      return "user registered";
    } else {
      throw new Error("error occured while registering");
    }
  } catch (err) {
    throw err;
  }
};

const login = async (email, password) => {
  try {
    const data = await UserDb.find_user_from_login_details(email, password);
    return data;
  } catch (err) {
    throw err;
  }
};

module.exports = { login , sign_up }