const express = require("express");
const {
  signup,
  signin,
  signout,
  forgotPassword,
  resetPassword,
  googleLogin
} = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { userSignupValidator, passwordResetValidator } = require("../validator");

const router = express.Router();

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.post("/signin/google", googleLogin);
router.post("/signout", signout);

// password forgot and reset routes
router.put("/forgot-password", forgotPassword);
router.put("/reset-password", passwordResetValidator, resetPassword);

// any route containing : userId, our app will first execute userById()
router.param("userId", userById);

module.exports = router;
