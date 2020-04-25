const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  const userDoc = await user.save();

  if (userDoc) {
    res.json({ userDoc: userDoc });
  } else {
    res.send({ message: "There is Some Errro" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  const token = jwt.sign({ email: user.email }, "Shhh");

  res.cookie("token", token, { maxAge: 30000000 });
  res.json({
    _id: user._id,
    email: user.email,
    token: token,
    message: "Login Succesfully",
  });
});

router.get("/signout", (req, res) => {
  res.clearCookie("token");
  res.end();
});

module.exports = router;
