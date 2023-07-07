const order_schema = (cart, shipementAddress, Payment, totalcost) => {
  return {
    UserId: cart.UserId,
    Books: cart.Books,
    totalcost: totalcost,
    shipementAddress,
    payment: Payment,
    orderStatus: "Requirements Complete please wait!",
  };
};

module.exports = { order_schema };
