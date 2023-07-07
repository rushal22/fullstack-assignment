const Bcrypt = require("bcrypt");
const Validate = require("../service/validation.js");

const user_model = (firstName, lastName, email, password, contact) => {
  const { error, value } = Validate.user_validation(
    firstName,
    lastName,
    email,
    password,
    contact
  );
  if (error) {
    throw error;
  }
  return {
    ...value,
    password: Bcrypt.hashSync(value.password, Bcrypt.genSaltSync(10)),
  };
};
module.exports = { user_model };
