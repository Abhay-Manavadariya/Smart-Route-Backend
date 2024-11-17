const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
const MainRouter = require("./Routes/MainRouter");

require("dotenv").config();
require("./Models/db");

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

app.use("/auth", AuthRouter);
app.use("/", MainRouter);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
