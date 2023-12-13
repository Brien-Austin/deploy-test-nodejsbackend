const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const dataRoute = require("./routes/user");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to mongodb server"))
  .catch((err) => console.log(err));

app.use("/api", userRoute);
app.use("/api/auth", authRoute);
app.use("/data", dataRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("listening on port 5000");
});
