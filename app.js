const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const { sequelize } = require("./config/database");
const videoController = require("./routes/videoRoutes");
const userController = require("./routes/userRoutes");

app.set("view engine", "pug");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.error("Connection failed: ", err);
  });

app.use("/user", videoController);
app.use("/", userController);
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
