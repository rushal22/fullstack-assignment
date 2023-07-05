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
    // console.log(user);
    if (await UserDb.find_user_from_email(user.email)) {
      throw new Error("email already exist");
    }
    if (await UserDb.add_user(user)) {
      console.log("user registered");
      return "user registered";
    } else {
      throw new Error("error occured while registering");
    }
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

const login = async (email, password) => {
  try {
    const data = await UserDb.find_user_from_login_details(email, password);
    // console.log(data);
    console.log("Logged Successfully");
    return data;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

// login("rushal@gmail.com", "123456789");

// sign_up({
//   firstName: "Rushal123",
//   lastName: "Maharjan",
//   password: "123456789",
//   email: "rushal@gmail.com",
//   contact: "9843437654",
// })

module.exports = { login , sign_up }