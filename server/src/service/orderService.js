const OrderDb = require("../database/orderDb");
const CartDb = require("../database/cartDb");
const UserDb = require("../database/userDb");
const BookDb = require("../database/bookDb");
const Schema = require("../models/orderModel");

const get_user_orders = async (userid) => {
  try {
    const userOrders = await OrderDb.get_order_by_userid(userid);
    if (userOrders) {
      return userOrders;
    }
    return "no order found for userid: " + userid;
  } catch (error) {
    throw error;
  }
};

const place_order = async (user_id, shipementAddress, Payment) => {
  try {
    const user_res = await UserDb.get_user_by_id(user_id);
    if (!user_res) {
      throw new Error("no user found for id :" + user_id);
    }
    const PAYMENT_TYPES = ["E-sewa", "Khalti", "fone pay", "CASH"];
    if (!PAYMENT_TYPES.includes(Payment.type)) {
      throw new Error("Invalid Payment");
    }
    let totalcost = 0;
    const cartResult = await CartDb.get_active_cart_data(user_id);
    if (cartResult.status !== "active") {
      throw new Error(`Cart has been already placed for order`);
    }
    for (book of cartResult.Books) {
      const bookResult = await BookDb.checking_book(book.id);
      if (bookResult.quantity < book.quantity) {
        throw new Error("not sufficient product on store");
      }
      if (BookDb.update_decrease_quantity(book.id, book.quantity)) {
        totalcost += book.quantity * bookResult["price"];
      }
    }
    const new_order = Schema.order_schema(
      cartResult,
      shipementAddress,
      Payment,
      totalcost
    );

    const placeOrder = await OrderDb.add_order(new_order);
    if (placeOrder.acknowledged) {
      // console.log(placeOrder);
      const deactivateCart = await CartDb.deactive_cart(user_id);
      if (deactivateCart) {
        //   console.log(deactivateCart);
        console.log("Order placed successfully");
        return {
          message: "Order placed successfully",
          orderid: placeOrder.insertedId,
        };
      }
      throw new Error("error occur while deactivating cart");
    }
    throw new Error("error occured");
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};
const shipments = {
  name: "Inside Ringroad",
  charge: 150,
  status: "on the way",
};
const address = { country: "Nepal", city: "Ktm", ...shipments };
const Pay = { type: "Khalti", status: "Paid" };
//   place_order("64a4ef061ac5ca513ce09d04" ,address, Pay)


const update_shipment_status = async (order_id, Status) => {
  try {
    const order = await OrderDb.get_order_by_id(order_id);
    //   if (order.orderStatus === "canceled" || order.orderStatus === "returned") {
    //     throw new Error("order has already been " + order.orderStatus);
    //   }
    if (order) {
      order.shipementAddress.status = Status;
      switch (Status) {
        case "awaiting":
          order.orderStatus = "placed";
          break;
        case "vendor_sourcing":
          order.orderStatus = "approved";
          break;
        case "on_route":
          order.orderStatus = "on the way";
          break;
        case "delivered":
          order.orderStatus = "delivered";
          break;
        default:
          throw new Error("provide valid status");
      }
      if (await OrderDb.update_order(order_id, order)) {
        console.log("shipment status updated");
        return "shipment status updated";
      }
      throw new Error("error updating order");
    }
    throw new Error("no order found");
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};
//   update_shipment_status("64a543640248c43671a350a6" , "awaiting")

const track_order = async (orderid) => {
  try {
    const order = await OrderDb.get_order_by_id(orderid);
    if (order) {
      console.log(order);
      return order;
    }
    throw new Error("no order found for this id:" + orderid);
  } catch (e) {
    console.log(e.message);
    throw e;
  }
};
track_order("64a543640248c43671a350a6");
