const Bcrypt = require('bcrypt')
const Validate = require('../service/validation.js')

   const user_model = (firstName, lastName, email, password,  contact) =>{
    const { error, value } = Validate.user_validation(
        firstName,
        lastName,
        email,
        password,
        contact
      );
      // console.log("value" , value);
      // console.log(error);
    if(error) {
    throw error
    }
    return{
      ...value, 
      password: Bcrypt.hashSync(value.password , Bcrypt.genSaltSync(10)),
    }
    // return {
    //     firstName: value.firstName,
    //     lastName: value.lastName,
    //     email: value.email,
    //     password: Bcrypt.hashSync(value.password , Bcrypt.genSaltSync(10)),
    //     contact: value.contact,
    //   };
   }
      module.exports = {user_model}