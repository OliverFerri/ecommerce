const router = require("express").Router();
const Cart = require("../models/Carts");
const { verifyTokenAndAuthorization } = require("../verifyToken");

//Create a new cart
router.post("/", async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Delete cart after checkout -- add verifyTokenAndAuthorization
router.delete("/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const deletedCart = await Cart.findOneAndDelete({
      userId: req.params.userId,
    });

    if (!deletedCart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    res.status(200).json("Cart has been deleted.");
  } catch (error) {
    res.status(500).json(error);
  }
});

//Update an existing cart -- add verifyTokenAndAuthorization
router.put("/:userId", async (req, res) => {
  try {
    const { productId, quantity, price } = req.body;
    console.log("Received Update Request for User:", req.params.userId);
    console.log("Received Product Data:", { productId, quantity, price });

    // Find the user's cart
    let cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    console.log("Existing Cart:", JSON.stringify(cart, null, 2));

    // Find the index of the product in the cart
    const productIndex = cart.products.findIndex(
      (p) => p.productId === productId
    );

    if (productIndex !== -1) {
      console.log("Product found in cart. Updating quantity...");
      cart.products[productIndex].quantity = quantity;

      // Remove product if quantity is 0?
      if (quantity === 0 || quantity === null) {
        console.log("Quantity is 0. Removing product from cart...");
        cart.products.splice(productIndex, 1);
      }
    } else {
      console.log("Product not found. Adding to cart...");
      cart.products.push({ productId, quantity, price });
    }

    // Update the number of products in the cart
    cart.numInCart = cart.products.length;

    console.log("Updated Cart Before Saving:", JSON.stringify(cart, null, 2));

    // Save the updated cart
    const updatedCart = await cart.save();

    console.log("Final Saved Cart:", JSON.stringify(updatedCart, null, 2));

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//

//Get one carts -- add verifyTokenAndAuthorization
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get all carts -- add verifyTokenAndAuthorization
router.get("/", async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
