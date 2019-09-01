const User = require("../models/user");

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
