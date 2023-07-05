const book_schema = (title, author, isbn, price, quantity) => {
  return {
    title: title,
    author: author,
    isbn: isbn,
    price: price,
    quantity: quantity,
  };
};
module.exports = { book_schema };
