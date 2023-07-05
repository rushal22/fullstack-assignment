const CartDb = require("../database/cartDb");
const UserDb = require("../database/userDb");
const BookDb = require("../database/bookDb");
const Schema = require("../models/cartModel");

const addto_cart = async (Userid, newBook) => {
  try {
    //assuming customer already have cart created
    // console.log(newBook);
    const user_res = await UserDb.get_user_by_id(Userid);
    if (!user_res) {
      throw new Error("no user found for id :" + Userid);
    }
    const book_res = await BookDb.get_book_by_id(newBook.Bookid);

    if (!book_res) {
      throw new Error("no book found for thid id :" + newBook.Bookid);
    }
    const Cart = await CartDb.get_active_cart_data(Userid);
    if (Cart) {
      for (let book of Cart.Books) {
        if (newBook.Bookid === book.id) {
          book.quantity += newBook.quantity;
          if (await CartDb.update_cart_data(Cart)) {
            console.log("quantity added to cart");
            return "quantity added to cart";
          }
          throw new Error("error occur while adding data on cart ");
        }
      }
      Cart["Books"].push({
        id: newBook["Bookid"],
        Quantity: newBook["quantity"],
      });
      if (await CartDb.update_cart_data(Cart)) {
        console.log("data added to cart");
        return "data added to cart";
      }
      throw new Error("error occur while adding data on cart");
    }

    const new_cart = Schema.cart_schema(Userid);

    new_cart["Books"].push({
      id: newBook["Bookid"],
      quantity: newBook["quantity"],
    });

    if (await CartDb.add_to_cart(new_cart)) {
      console.log("data added to cart");
      return "data added to cart";
    } else {
      throw new Error("error Occured");
    }
  } catch (e) {
    console.log(e.message);
    throw e;
  }
};
const cart_info = {
  Bookid: "64a51471b7c9070a2ebc1b7f",
  quantity: 2,
};

// addto_cart("64a4ef061ac5ca513ce09d04" , cart_info);

const update_cart_quantity = async (userid, data) => {
    try {
      const res = await CartDb.update_quantity_from_cart(userid, data);
      console.log(res)
      if (res) {
        console.log("Quantity updated succesfully");
        return "Quantity updated succesfully" 
      }
    //   throw new Error ("no book found for id:" + bookid);
    } catch (e) {
      console.log(e.message);
      throw e
    }
  };
  const data = {bookid : "64a513f244a8b115b49c6e8a" , quantity : 2}
//   update_cart_quantity("64a4ef061ac5ca513ce09d04" , data)

  const delete_book_from_cart = async (userid, bookid) => {
    try {
      const res = await CartDb.remove_book_from_cart(userid, bookid);
      if (res) {
        console.log("removed book from cart successfully");
        return "removed book from cart successfully"
      }
      console.log("no book or user on this id :" + bookid +" "+ userid);
    } catch (e) {
      console.log(e.message);
      throw e
    }
  };
//   delete_book_from_cart("64a4ef061ac5ca513ce09d04" , "64a51471b7c9070a2ebc1b7f")

  module.exports = {}