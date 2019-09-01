const User = require("../models/user");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "찾을 수 없는 사용자입니다."
      });
    }
    req.profile = user; // adds profile object in req with user info
    next();
  });
};
