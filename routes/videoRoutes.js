const express = require("express");
const userRouter = express.Router();
const videoController = require("../controllers/videoController");

userRouter.get("/videos", videoController.getAllVideos);
userRouter.get("/videos/:id", videoController.getVideoById);
userRouter.post("/videos", videoController.createVideo);
userRouter.put("/videos/:id", videoController.updateVideo);
userRouter.delete("/videos/:title", videoController.deleteVideo);

module.exports = userRouter;
