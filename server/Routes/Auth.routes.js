const express = require("express");
const {
  Signup,
  LoginUser,
  verifyToken,
  getUser,
  refreshToken,
  logout,
} = require("../controller/user-controller");
const router = express.Router();

router.post("/signup", Signup);
router.post("/login", LoginUser);
router.get("/verifyuser", verifyToken, getUser);
router.get("/refresh", refreshToken, verifyToken, getUser);
router.post("/logout", verifyToken, logout);

module.exports = router;
