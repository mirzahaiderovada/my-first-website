const express = require("express");
const app = express();
const { sequelize } = require("./config/database");
const videoController = require("./routes/videoRoutes");

app.use(express.json());

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.error("Connection failed: ", err);
  });

app.use("/", videoController);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
