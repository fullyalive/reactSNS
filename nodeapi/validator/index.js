exports.createPostValidator = (req, res, next) => {
  // title
  req.check("title", "제목을 입력하세요").notEmpty();
  req.check("title", "제목은 2글자 이상이어야 합니다.").isLength({
    min: 4,
    max: 150
  });
  req.check("body", "본문을 입력하세요").notEmpty();
  req.check("body", "본문은 2글자 이상이어야 합니다.").isLength({
    min: 4,
    max: 150
  });
  // check for errors
  const errors = req.validationErrors();

  // if error shows the first one as they happen
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }

  // proceed to next middleware
  next();
};

exports.userSignupValidator = (req, res, next) => {
  // name is not null and between 4-16 characters
  req.check("name", "이름을 입력해주세요.").notEmpty();

  // email is not null, valid and normalized
  req
    .check("email", "이메일 주소를 입력해주세요.")
    .notEmpty()
    .matches(/.+\@.+\..+/)
    .withMessage("이메일 주소는 @를 포함해야 합니다.");
  // check for password
  req.check("password", "비밀번호를 입력해주세요.").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("비밀번호는 6글자 이상이어야 합니다.");
  // .matches(/\d/)
  // .withMessage("비밀번호에 하나 이상의 숫자가 들어가야 합니다.")
  // check for errors
  const errors = req.validationErrors();
  // if error shows the first one as they happen
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};
