const router = require("express").Router();
const User = require("../models/Users");
const CryptoJS = require("crypto-js");
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../verifyToken");

//Create a user (Admin Only)
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newUser = new User(req.body);

  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Update a user
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_PASSWORD
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Delete a user
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been successfully deleted.");
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get a user
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get all users
router.get("/", async (req, res) => {
  const query = req.query.new;

  try {
    const users = query
      ? await User.find().sort({ createdAt: -1 }).limit(10)
      : await User.find();

    // Exclude password field from each user
    const usersWithoutPasswords = users.map(({ _doc }) => {
      const { password, ...others } = _doc;
      return others;
    });

    res.status(200).json(usersWithoutPasswords);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
