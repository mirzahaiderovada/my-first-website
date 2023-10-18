const { Router } = require("express");
const userController = require("../controllers/userController");
const videoController = require("../controllers/videoController");
const auth = require("../middlewares/auth");
const router = Router();
router.get("/signup", (req, res) => {
  res.render("signup");
});
router.post("/signup", userController.signup);
router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", userController.login);

router.get("/home", auth, videoController.getAllVideos);
router.get("/video/:id", auth, videoController.getVideoById);
router.post("/video", auth, videoController.createVideo);
router.put("/video/:id", auth, videoController.updateVideo);
router.delete("/video/:title", auth, videoController.deleteVideo);
module.exports = router;
