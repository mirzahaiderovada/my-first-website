const express = require("express");
const userRouter = express.Router();
const videoController = require("../controllers/videoController");
const auth = require("../middlewares/auth");

userRouter.get("/videos", auth, videoController.getAllVideos);
userRouter.get("/videos/:id", auth, videoController.getVideoById);
userRouter.post("/videos", auth, videoController.createVideo);
userRouter.put("/videos/:id", auth, videoController.updateVideo);
userRouter.delete("/videos/:title", auth, videoController.deleteVideo);

module.exports = userRouter;
