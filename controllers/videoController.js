const Video = require("../models/videoModel");

// Get a list of all videos
const getAllVideos = (req, res) => {
  const userEmail = req.user_email; // The user's email in req.user_email
  Video.findAll({
    where: {
      user_email: userEmail,
    },
  })
    .then((videos) => {
      // res.json(videos);
      res.render("home", { videos });
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to retrieve user's videos" });
    });
};

// Get a video by ID
const getVideoById = (req, res) => {
  const userEmail = req.user_email;
  const { id } = req.params;
  Video.findOne({
    where: {
      video_id: id,
      user_email: userEmail,
    },
  })
    .then((video) => {
      if (video) {
        res.json(video);
      } else {
        res.status(404).json({ error: "Video not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to retrieve video" });
    });
};

// Create a new video
const createVideo = (req, res) => {
  const { title, description } = req.body;
  const userEmail = req.user_email;
  Video.create({ title, description, user_email: userEmail })
    .then((video) => {
      res.json(video);
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

// Update a video by ID
const updateVideo = (req, res) => {
  const userEmail = req.user_email;
  const { id } = req.params;
  const { title } = req.body;
  Video.update(
    { title },
    {
      where: {
        video_id: id,
        user_email: userEmail,
      },
    }
  )
    .then((result) => {
      if (result[0]) {
        res.json({ success: true, message: "Video updated" });
      } else {
        res.status(404).json({ error: "Video not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to update video" });
    });
};

// Delete a video by title
const deleteVideo = (req, res) => {
  const userEmail = req.user_email;
  const { title } = req.params;
  Video.destroy({
    where: {
      title,
      user_email: userEmail,
    },
  })
    .then((result) => {
      if (result) {
        res.json({ success: true, message: "Video deleted" });
        res.status(202).json({ message: "Video deleted" });
      } else {
        res.status(404).json({ error: "Video not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to delete video" });
    });
};

module.exports = {
  getAllVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
};
