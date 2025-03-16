const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const reviewRoute = require("./routes/review");
const orderRoute = require("./routes/order");
const cors = require("cors");

app.use(
  cors({
    origin: "https://ecommerce-zc1w.vercel.app", // Change to your Vercel frontend URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

dotenv.config();
const stripeRoute = require("./routes/stripe");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to mongodb!"))
  .catch((error) => console.log(error));

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/orders", orderRoute);

app.listen(process.env.PORT || 8700, () =>
  console.log("Backend server is running...")
);
