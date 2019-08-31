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
