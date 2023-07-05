const BookDb = require("../database/bookDb");
const Schema = require("../models/bookModel");




const get_all_books = async () =>{
    try {
      const books = await BookDb.get_books_data()
      if (books.length > 0) {
        // console.log(products);
        return books
         
       }else{
        return ({
          'message': 'no product found'
        })
       }
    } catch (error) {
      
    }
  }
  get_all_books()
  
  const get_book_id = async (id) =>{
    try{
      const books = await BookDb.get_book_by_id(id)
      if(books){
        return books
      }
      return ({
        'message': 'no product found'
      })
    }catch(err){
      
    }
  }
  

const search_books = async (keyword) => {
  try {
    const result = await BookDb.find_books_from_data(keyword);
    // console.log(result);
    if (result.length > 0) {
      console.log(result);
      return result;
    }
    throw new Error("no result found");
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};
// search_books("A")


const add_books = async (title, author, isbn, price, quantity) => {
  try {
    const item = Schema.book_schema(
      title,
      author,
      isbn,
      price,
      quantity
    );
    if (await BookDb.add_book(item)) {
      console.log("item added");
      return "item added";
    } else {
      throw new Error("error while adding books");
    }
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

// add_books("A Passage to India" , "E. M. Forster" , 123222 , 7000 , 14)

const remove_book = async (bookid) => {
    try {
      const res = await BookDb.remove_book_from_data(bookid)
      if (res) {
        console.log("removed successfully");
        return "removed successfully";
      }
    } catch (err) {
      console.log(err.message);
      throw err
    }
  };

//   remove_book("64a50528b244f01e1e6f0c59")

const update_book = async(bookid , bookinfo) => {
    try {
      if(await BookDb.update_book_from_data(bookid ,bookinfo)){
          console.log("updated successfully");
          return "updated successfully" ;
        } 
    } catch (err) {
      console.log(err.message);
      throw err
    }
  };
  const pro = {price: 3000, quantity: 12};
//   update_book("64a51471b7c9070a2ebc1b7f", pro)

module.exports = {update_book, remove_book,add_books,search_books , get_all_books , get_book_id}