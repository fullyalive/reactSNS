const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

exports.signup = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists)
    return res.status(403).json({
      error: "이미 존재하는 이메일입니다."
    });

  const user = await new User(req.body);
  await user.save();
  res.status(200).json({ message: "회원가입 성공! 로그인 해주세요." });
};

exports.signin = (req, res) => {
  // find the user based on email
  const { _id, name, email, password } = req.body;
  // if error or no user
  // if user, authenticate
  // generate a token with user id and secret
  // persist the token as 't' in cookie with expiry date
  // return response with user and token to frontend client
};
