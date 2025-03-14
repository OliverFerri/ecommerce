const router = require("express").Router();
const Order = require("../models/Orders");
const { verifyTokenAndAuthorization } = require("../verifyToken");

//Create an order
router.post("/", async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get all orders
router.get("/latest/:userId", async (req, res) => {
  try {
    const latestOrder = await Order.findOne({ userId: req.params.userId }).sort(
      { createdAt: -1 }
    );

    if (!latestOrder) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json(latestOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Get latest order for specific user
router.get("/all/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get an order
router.get("/:userId", async (req, res) => {
  try {
    const order = await Order.findOne({ userId: req.params.userId });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
