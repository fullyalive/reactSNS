const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
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
  User.findOne({ email }, (err, user) => {
    // if err or no user
    if (err || !user) {
      return res.status(401).json({
        error: "해당 이메일이 존재하지 않습니다."
      });
    }
    // if user is foudn make sure the email and password match
    // create authentication method in model and use here
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "비밀번호가 틀렸습니다."
      });
    }
    // generate a token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // persist the token as 't' in cookie with expiry date
    res.cookie("t", token, { expire: new Date() + 9999 });
    // return response with user and token to frontend client
    const { _id, name, email } = user;
    return res.json({ token, user: { _id, email, name } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  return res.json({ message: "로그아웃 되었습니다." });
};

exports.requireSignin = expressJwt({
  // if the token is valid, express jwt appends the verified user id
  // in an auth key to the request object
  secret: process.env.JWT_SECRET,
  userProperty: "auth"
});
