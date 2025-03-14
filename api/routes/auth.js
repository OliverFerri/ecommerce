const router = require("express").Router();
const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

// Create new user
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_PASSWORD
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json("Username or password is incorrect");
    }

    const decryptPass = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_PASSWORD
    );

    const originalPassword = decryptPass.toString(CryptoJS.enc.Utf8);
    const inputPassword = req.body.password;
    if (originalPassword !== inputPassword) {
      return res.status(401).json("Username or password is incorrect");
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC
      // { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
