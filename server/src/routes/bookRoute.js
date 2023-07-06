const express = require('express')
const router = express.Router()
const book = require('../controller/bookApi')

router.get('/', (req, res) =>{
    res.send('hello')
})

router.post("/book/addbooks", book.add_book)
router.delete("/book/removebook/:id",book.remove_book)
router.put("/book/updatebook/:id" ,book.update_book )
router.get("/book/searchbook/:keyword", book.search_books)
router.get('/book', book.all_books)
router.get('/book/:id', book.get_book_by_id)


module.exports = router;