const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

// db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ DB Connected"));
const PORT = process.env.PORT || 8888;

// bring in routes
const postRoutes = require("./routes/post");

// middleware
app.use(morgan("dev"));
app.use("/", postRoutes);

app.listen(PORT, () => {
  console.log(`✅ A Node JS API is listening on port: ${PORT}`);
});
