const BookDb = require("../database/bookDb");
const Schema = require("../models/bookModel");

const get_all_books = async () => {
  try {
    const books = await BookDb.get_books_data();
    if (books.length > 0) {
      return books;
    } else {
      return {
        message: "no product found",
      };
    }
  } catch (error) {}
};


const get_book_id = async (id) => {
  try {
    const books = await BookDb.get_book_by_id(id);
    if (books) {
      return books;
    }
    return {
      message: "no product found",
    };
  } catch (err) {}
};

const search_books = async (keyword) => {
  try {
    const result = await BookDb.find_books_from_data(keyword);

    if (result.length > 0) {
      return result;
    }
    throw new Error("no result found");
  } catch (err) {
    throw err;
  }
};
search_books("s")

const add_books = async (title, author, isbn, price, quantity) => {
  try {
    const item = Schema.book_schema(title, author, isbn, price, quantity);
    if (await BookDb.add_book(item)) {
      return "item added";
    } else {
      throw new Error("error while adding books");
    }
  } catch (err) {
    throw err;
  }
};

const remove_book = async (bookid) => {
  try {
    const res = await BookDb.remove_book_from_data(bookid);
    if (res) {
      return "removed successfully";
    }
  } catch (err) {
    throw err;
  }
};

const update_book = async (bookid, bookinfo) => {
  try {
    if (await BookDb.update_book_from_data(bookid, bookinfo)) {
      return "updated successfully";
    }
  } catch (err) {
    throw err;
  }
};
const pro = { price: 3000, quantity: 12 };
//   update_book("64a51471b7c9070a2ebc1b7f", pro)

module.exports = {
  update_book,
  remove_book,
  add_books,
  search_books,
  get_all_books,
  get_book_id,
};
