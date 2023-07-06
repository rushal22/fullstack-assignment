const db_connect = require("../config_database/mongoConfig");
const mongodb = require("mongodb");

async function get_books_data() {
  let con = await db_connect("books");
  let data = await con.find().toArray();
  // console.log(data);
  return data;
}

async function find_books_from_data(keyword) {
  try {
    const allBooks = await get_books_data();
    const result = [];
    for (let book of allBooks) {
      for (key in book) {
        if (key === "book_id") {
          continue;
        } else {
          if (typeof book[key] === "string" && typeof keyword === "string") {
            if (book[key].toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
              result.push(book);
              break;
            }
          }
        }
      }
    }
    return result;
  } catch (e) {
    throw e;
  }
}

async function add_book(book) {
  try {
    let con = await db_connect("books");
    let result = await con.insertOne(book);
    return result.acknowledged;
  } catch (e) {
    throw e;
  }
}
async function remove_book_from_data(id) {
  try {
    let con = await db_connect("books");
    let book = await con.findOne({ _id: new mongodb.ObjectId(id) });
    if (book) {
      let res = await con.deleteOne({ _id: new mongodb.ObjectId(id) });
      return res.acknowledged;
    }
    throw new Error("no book found for id :" + id);
  } catch (e) {
    throw e;
  }
}

async function update_book_from_data(id, bookinfo) {
  try {
    let con = await db_connect("books");
    let book = await con.findOne({ _id: new mongodb.ObjectId(id) });
    if (book) {
    //   console.log(bookinfo);
      let res = await con.updateOne(
        { _id: new mongodb.ObjectId(id) },
        { $set: bookinfo }
      );
      return res.acknowledged;
    }
    throw new Error("no book found for this id :" + id);
  } catch (e) {
    throw e;
  }
}

async function get_book_by_id(id) {
    try {
      let con = await db_connect("books");
      let book = await con.findOne({_id: new mongodb.ObjectId(id)});
      
      if(book) {
        return book;
      }
      throw new Error("no book found for this id")
    } catch (e) {
      throw e;
    }
  }

  async function checking_book(bookid){
    try {
      let db = await db_connect("books");
      const book = await db.findOne({_id : new mongodb.ObjectId(bookid)})
        if(book){
          return book
        }
      throw new Error("no book found for id:" + bookid);
    } catch (e) {
      throw e;
    }
  };
  async function update_decrease_quantity(id, quantity) {
    try{
      let con = await db_connect("books");
      let book = await con.findOne({_id : new mongodb.ObjectId(id)});
      if(book){
        let res = await con.updateOne({_id : new mongodb.ObjectId(id)},{$set:{quantity:(book.quantity - quantity)}});
        return res.acknowledged
      }
      throw new Error ("no book found for id:" + id);
    }catch(e){
      throw e
    }
  }
  
  
  
module.exports = {
  get_books_data,
  find_books_from_data,
  add_book,
  remove_book_from_data,
  update_book_from_data,
  get_book_by_id,
  checking_book,
  update_decrease_quantity,
};
