const Post = require("../models/post");
const formidable = require("formidable");
const fs = require("fs");

exports.getPosts = (req, res) => {
  const posts = Post.find()
    .select("_id title body") // 보여주고자 하는 field
    .then(posts => {
      res.status(200).json({ posts });
    })
    .catch(err => console.log(err));
};

exports.createPost = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "이미지를 업로드할 수 없습니다."
      });
    }
    let post = new Post(fields);
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    post.postedBy = req.profile;
    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }
    post.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err
        });
      }
      res.json(result);
    });
  });
};
