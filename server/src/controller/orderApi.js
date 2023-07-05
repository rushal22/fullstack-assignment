const order = require('../service/order')



const get_user_orders = async (req, res) =>{
    try{
        const userid = req.params.userid;
        const result = await order.get_user_orders(userid);
        res.status(200).send({data:result})
    }catch(err){
        res.status(400).send(err.message);
    }
}


const place_order = async (req, res) =>{
    try{
        const userid = req.params.userid;
        const data = req.body;
        const result = await order.place_order(userid ,data.shipementAddress , data.Payment );
        console.log(result);
        res.status(200).send({data:result})
    }catch(err){
        res.status(400).send(err.message);
    }
}

const update_shipment_status = async (req, res) => {
    try{
        const orderid = req.params.orderid;
        const data = req.body;
        const result = await order.update_shipment_status(orderid, data.status);
        res.status(200).send(result)
    }catch(err){
        res.status(400).send(err.message);
    }
}

const track_order = async (req, res) => {
    try{
        const orderid = req.params.orderid;
        const result = await order.track_order(orderid);
        res.status(200).send(result)
    }catch(err){
        res.status(400).send(err.message)
    }
}

module.exports = {
  place_order,
  update_shipment_status,
  track_order, 
  get_user_orders
};