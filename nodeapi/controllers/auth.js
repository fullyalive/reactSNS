const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const User = require("../models/user");
const _ = require("lodash");
const { sendEmail } = require("../helpers");

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
  const { email, password } = req.body;
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

exports.googleLogin = (req, res) => {
  // try signup by finding user with req.email
  let user = User.findOne({ email: req.body.email }, (err, user) => {
    if (err || !user) {
      // create a new user and login
      user = new User(req, body);
      req.profile = user;
      user.save();

      //generate a token with user id and secret
      const token = jwt.sign(
        { _id: user._id, iss: "NODEAPI" },
        process.env.JWT_SECRET
      );
      res.cookie("t", token, { expore: new Date() + 9999 });
      // return response with user and token to frontend client
      const { _id, name, email } = user;
      return res.json({ token, user: { _id, name, email } });
    } else {
      // update existing user with new social info and login
      req.profile = user;
      user = _.extend(user, req.body);
      user.updated = Date.now();
      user.save();

      //generate a token with user id and secret
      const token = jwt.sign(
        { _id: user._id, iss: "NODEAPI" },
        process.env.JWT_SECRET
      );
      res.cookie("t", token, { expire: new Date() + 9999 });
      // return response with user and token to frontend client
      const { _id, name, email } = user;
      return res.json({ token, user: { _id, name, email } });
    }
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

// add forgotPassword and resetPassword methods
exports.forgotPassword = (req, res) => {
  if (!req.body) return res.status(400).json({ message: "No request body" });
  if (!req.body.email)
    return res.status(400).json({ message: "No Email in request body" });

  console.log("forgot password finding user with that email");
  const { email } = req.body;
  console.log("signin req.body", email);
  // find the user based on email
  User.findOne({ email }, (err, user) => {
    // if err or no user
    if (err || !user)
      return res.status("401").json({
        error: "이메일을 찾을 수 없습니다. 다시 한 번 확인해주세요."
      });

    // generate a token with user id and secret
    const token = jwt.sign(
      { _id: user._id, iss: "NODEAPI" },
      process.env.JWT_SECRET
    );

    // email data
    const emailData = {
      from: "noreply@node-react.com",
      to: email,
      subject: "[서비스이름] 비밀번호 변경",
      text: `비밀번호를 변경하려면 다음 링크를 눌러주세요 : ${process.env.CLIENT_URL}/reset-password/${token}`,
      html: `<p>비밀번호 변경하기 : </p> <p>${process.env.CLIENT_URL}/reset-password/${token}</p>`
    };

    return user.updateOne({ resetPasswordLink: token }, (err, success) => {
      if (err) {
        return res.json({ message: err });
      } else {
        sendEmail(emailData);
        return res.status(200).json({
          message: `이메일이 전송되었습니다. 받은 편지함을 확인해주세요.`
        });
      }
    });
  });
};

// to allow user to reset password
// first you will find the user in the database with user's resetPasswordLink
// user model's resetPasswordLink's value must match the token
// if the user's resetPasswordLink(token) matches the incoming req.body.resetPasswordLink(token)
// then we got the right user

exports.resetPassword = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  User.findOne({ resetPasswordLink }, (err, user) => {
    // if err or no user
    if (err || !user)
      return res.status("401").json({
        error: "유효하지 않습니다. 다시 한 번 시도해주세요."
      });

    const updatedFields = {
      password: newPassword,
      resetPasswordLink: ""
    };

    user = _.extend(user, updatedFields);
    user.updated = Date.now();

    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err
        });
      }
      res.json({
        message: `비밀번호가 변경되었습니다. 새로운 비밀번호로 로그인해주세요.`
      });
    });
  });
};
