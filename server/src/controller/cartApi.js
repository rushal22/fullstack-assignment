const CartService = require('../service/cartService')



const get_user_cart = async (req, res) =>{
    try {
        const userid = req.params.id
        
        const carts = await CartService.get_cart_by_id(userid)
        console.log(carts);
        res.status(200).json(carts)
    } catch (error) {
        res.status(400).json({
            'message': 'somthing went wrong'
        })
    }
}

const add_cart = async (req, res) =>{
    try{
        const userid = req.params.userid;
        const books = req.body;
        console.log(books , userid);
        const result = await CartService.addto_cart(userid, books);
        res.status(200).send(result)
    }catch(err){
        res.status(400).send(err.message);
    }
}
const update_cart_quantity = async (req, res) =>{
    try{
        const user_id = req.params.userid;
        const data = req.body;
        const result = await CartService.update_cart_quantity (user_id,data);
        res.status(200).send(result)
    }catch(err){
        res.status(400).send(err.message);
    }
}

const remove_book_from_cart = async (req, res) =>{
    try{
        const user_id = req.params.userid;
        const data = req.body;
        const result = await CartService.delete_book_from_cart(user_id , data);
        res.status(200).send(result)
    }catch(err){
        res.status(400).send(err.message);
    }
}

module.exports = {add_cart , update_cart_quantity , remove_book_from_cart ,get_user_cart}