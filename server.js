require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.APP_PORT;

app.use(express.static("dist"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
