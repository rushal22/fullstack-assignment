const express = require('express')
const router = express.Router()
const order = require('../controller/orderApi')

router.get('/', (req, res) =>{
    res.send('hello')
})

router.post("/order/placeorder/:userid" , order.place_order)
router.put("/order/shipmentstatus/:orderid" , order.update_shipment_status)
router.get("/order/trackorder/:orderid" , order.track_order)
router.get("/order/getallorders/:userid" , order.get_user_orders)


module.exports = router