const express = require('express')
const router = express.Router()
const cart = require('../controller/cartApi')

router.get('/', (req, res) =>{
    res.send('hello')
})

router.post("/cart/addcart/:userid", cart.add_cart)
router.put("/cart/updatecart/:userid" , cart.update_cart_quantity)
router.delete("/cart/removecartbook/:userid" ,cart.remove_book_from_cart)
router.get("/cart/getcart/:id" , cart.get_user_cart )

module.exports = router;