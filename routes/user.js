const router = require("express").Router();
const UserDB = require("../models/User");

router.get("/users", async (req, res) => {
  const users = await UserDB.find();
  res.status(200).json({
    users: users,
  });
});

module.exports = router;
