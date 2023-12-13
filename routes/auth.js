const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const router = require("express").Router();
const UserSchema = require("../models/User");

router.post("/register", async (req, res) => {
  const { password, username } = req.body;
  const existingUser = await UserSchema.findOne({ username: username });
  if (!existingUser) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserSchema({
      username: username,
      email: req.body.email,
      password: hashedPassword,
    });

    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(400).json({
      message: "Already Registered",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await UserSchema.findOne({ email: email });
  if (!existingUser) {
    res.status(404).json({
      message: "User not found",
    });
  } else {
    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isValidPassword) {
      res.status(404).json({
        message: "Invalid password",
      });
    } else {
      res.status(200).json({
        message: "Logged in Successfully",
      });
    }
  }
});

module.exports = router;
