const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8000;

const userRouter = require("./routes/userRoute");
const bookRouter = require("./routes/bookRoute");
const cartRouter = require("./routes/cartRoute");
const orderRouter = require("./routes/orderRoute");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use("/api", userRouter);
app.use("/api", bookRouter);
app.use("/api", cartRouter);
app.use("/api", orderRouter);

app.get("/", async (req, res) => {
  res.send("Hello!, This is from root API");
});
app.listen(PORT, (err) => {
  if (err) {
    return console.log("ERROR", err);
  } else {
    console.log("Server Started on port:" + PORT);
  }
});
