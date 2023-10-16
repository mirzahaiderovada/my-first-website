const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController");

router.get("/videos", videoController.getAllVideos);
router.get("/videos/:id", videoController.getVideoById);
router.post("/videos", videoController.createVideo);
router.put("/videos/:id", videoController.updateVideo);
router.delete("/videos/:title", videoController.deleteVideo);

module.exports = router;
