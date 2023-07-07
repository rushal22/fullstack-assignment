const BookService = require("../service/bookService");

const all_books = async (req, res) => {
  try {
    const books = await BookService.get_all_books();
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({
      message: "somthing went wrong",
    });
  }
};

const get_book_by_id = async (req, res) => {
  try {
    const bookid = req.params.id;

    const books = await BookService.get_book_id(bookid);

    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({
      message: "somthing went wrong",
    });
  }
};
const add_book = async (req, res) => {
  try {
    const data = req.body;

    const result = await BookService.add_books(
      data.title,
      data.author,
      data.isbn,
      data.price,
      data.quantity
    );
    res.status(200).send({ data: result });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const remove_book = async (req, res) => {
  try {
    const bookid = req.params.id;
    const result = await BookService.remove_book(bookid);
    res.status(200).send({ data: result });
  } catch (err) {
    res.status(400).send(err.message);
  }
};
const update_book = async (req, res) => {
  try {
    const bookid = req.params.id;
    const data = req.body;

    const result = await BookService.update_book(bookid, data);
    res.status(200).send({ data: result });
  } catch (err) {
    res.status(400).send(err.message);
  }
};
const search_books = async (req, res) => {
  try {
    const keyword = req.params.keyword;

    const result = await BookService.search_books(keyword);
    res.status(200).send({ data: result });
  } catch (err) {
    res.status(400).send({ data: err.message });
  }
};

module.exports = {
  add_book,
  remove_book,
  update_book,
  search_books,
  all_books,
  get_book_by_id,
};
