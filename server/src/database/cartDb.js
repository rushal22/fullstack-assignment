const db_connect = require("../config_database/mongoConfig");
const mongodb = require("mongodb");

async function get_cart_data (){
    let con = await db_connect('carts');
    let data = await con.find().toArray();
    return data;
  }

  async function get_cart_id(id) {
    try {
      let con = await db_connect("carts");
      let cart = await con.findOne({ _id: new mongodb.ObjectId(id)});
      if (cart) {
        return cart;
      }
      throw new Error("no cart found for this id")
    } catch (e) {
      throw e;
    }
  }
  async function update_cart_data(cart){
    try{
      let con = await db_connect('carts');
      let res = await con.updateOne({_id:new mongodb.ObjectId(cart._id)}, {$set:cart})
      return res.acknowledged
    }catch(e){
      throw e
    }
  }
  
  async function get_active_cart_data(user_id){
    try{
      let con = await db_connect('carts');
      let cart = await con.findOne({UserId: user_id, status:"active"});
      if(cart){
        return cart
      }
    return false
  }catch(e){
    throw e
  }
  }
  async function add_to_cart (cart){
    try {
      let con = await db_connect('carts');
      let result = await con.insertOne(cart);
      return result.acknowledged;
  }catch(e){
  throw e
  }
  }
  async function update_quantity_from_cart(userid, data) {
    try {
      let con = await db_connect("carts");
      let cart = await con.findOne({UserId: userid , status: "active" });
       if(cart) {
        for (var book of cart.Books) {
          console.log(book, data.bookid);
          if (book.id === data.bookid) { 
            book.quantity = data.quantity;
            let res = await con.updateOne(
              { _id: cart._id},
              { $set: cart }
            );
            // console.log(res);
            return res.acknowledged;
          }
          throw new Error("no book id found for this user id :" + data.bookid)
        }  
    }
      throw new Error("no user found for id:" + userid);
    } catch (e) {
      throw e;
    }
  }
  
  async function remove_book_from_cart(userid , bookid){
    try {
      let con = await db_connect("carts");
      let cart = await con.findOne({UserId :userid , status : "active"});
      if(cart) {
        let i = 0
        for(var book of cart.Books) {
          if (book.id === bookid) {
            cart.Books.splice(i,1)
            let res = await con.updateOne({_id: cart._id}, {$set : cart})
            return res.acknowledged;
          }
          i += 1
        }
        throw new Error("no book found for this user id:" + bookid)
      }
      throw new Error("no user found for id:" + userid);
    } catch (e) {
      throw e;
    }
  }
  async function find_cart (cartId) {
    try{
        const allCart = await get_cart_data()
        for(cart of allCart){
            if(cart.CartId === cartId){
                return cart;
            }
        }
        throw new Error("no cart found for id :" + cartId)
    }catch(e){
        throw e
    }
  }
  
  async function deactive_cart(user_id){
    try{
      let con = await db_connect('carts');
      let cart = await con.findOne({UserId: user_id, status:"active"});
   if(cart){
    let res = await con.updateOne({_id: new mongodb.ObjectId(cart._id)} , {$set : {status:"deactive"}})
    return res.acknowledged
   }
    throw new Error("no active cart found :" + user_id)
  }catch(e){
    throw e
  }
  }
  module.exports = {
    get_cart_data,
    update_cart_data,
    get_active_cart_data,
    add_to_cart,
    update_quantity_from_cart,
    remove_book_from_cart,
    find_cart,
    deactive_cart,
    get_cart_id
  };