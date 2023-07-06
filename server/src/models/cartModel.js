const cart_schema = (Userid , book) =>{
    return{
     UserId: Userid,
     Books: [{
        id: book.bookid,
        quantity: book.quantity
     }],
     status: "active"
    }     
 }
 module.exports = {cart_schema}