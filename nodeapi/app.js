const express = require("express");
const app = express();
const morgan = require("morgan");
const myOwnMiddleware =(req, res, next) => {
    console.log("middleware applied!!!")
    next();
}
// bring in routes
const postRoutes = require("./routes/post");

// middleware
app.use(myOwnMiddleware);
app.use(morgan("dev"));
app.get("/", postRoutes.getPosts);

const port = 8888;
app.listen(port, () => {
  console.log(`✅ A Node JS API is listening on port: ${port}`);
});
