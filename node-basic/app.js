// const express = require("express");
// const app = express();

// app.get("/", (req, res) => {
//   res.send("hey whatup from express");
// });

// app.listen(3000);
const fs = require("fs");
const fileName = "target.txt";

fs.watch(fileName, () => console.log(`File changed!`));
