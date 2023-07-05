const cart_schema = (Userid) =>{
    return{
     UserId: Userid,
     Books: [],
     status: "active"
    }     
 }
 module.exports = {cart_schema}