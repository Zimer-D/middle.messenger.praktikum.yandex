require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.APP_PORT;

app.use(express.static("dist"));
app.get("/*", (req, res) => {
  // eslint-disable-next-line n/no-path-concat
  res.sendFile(`${__dirname}/dist/index.html`);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
