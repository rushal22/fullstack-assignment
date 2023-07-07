const CartDb = require("../database/cartDb");
const UserDb = require("../database/userDb");
const BookDb = require("../database/bookDb");
const Schema = require("../models/cartModel");

const get_cart_by_id = async (id) => {
  try {
    const carts = await CartDb.get_active_cart_data(id);
    if (carts) {
      return carts;
    } else {
      return {
        message: "no product found",
      };
    }
  } catch (err) {
    throw err;
  }
};

const addto_cart = async (Userid, newBook) => {
  try {
    const user_res = await UserDb.get_user_by_id(Userid);
    if (!user_res) {
      throw new Error("no user found for id :" + Userid);
    }

    const book_res = await BookDb.get_book_by_id(newBook.bookid);
    if (!book_res) {
      throw new Error("no book found for thid id :" + newBook.bookid);
    }
    const Cart = await CartDb.get_active_cart_data(Userid);
    if (Cart) {
      const existingBookIndex = Cart.Books.findIndex(
        (book) => book.id == newBook.bookid
      );
      if (existingBookIndex !== -1) {
        Cart.Books[existingBookIndex].quantity += newBook.quantity;
      } else {
        Cart["Books"].push({
          id: newBook["bookid"],
          quantity: newBook["quantity"],
        });
      }
      if (await CartDb.update_cart_data(Cart)) {
        return "quantity added to cart";
      }
      throw new Error("error occur while adding data on cart ");
    }
    const new_cart = Schema.cart_schema(Userid, newBook);
    if (await CartDb.add_to_cart(new_cart)) {
      return "data added to cart";
    } else {
      throw new Error("error Occured");
    }
  } catch (e) {
    throw e;
  }
};
const cart_info = {
  Bookid: "64a51442d1f4500259330473",
  quantity: 2,
};

const update_cart_quantity = async (userid, data) => {
  try {
    const res = await CartDb.update_quantity_from_cart(userid, data);
    if (res) {
      return "Quantity updated succesfully";
    }
  } catch (e) {
    throw e;
  }
};
const data = { bookid: "64a513f244a8b115b49c6e8a", quantity: 2 };

const delete_book_from_cart = async (userid, bookid) => {
  try {
    const res = await CartDb.remove_book_from_cart(userid, bookid);
    if (res) {
      return "removed book from cart successfully";
    }
  } catch (e) {
    throw e;
  }
};

module.exports = {
  addto_cart,
  update_cart_quantity,
  delete_book_from_cart,
  get_cart_by_id,
};
