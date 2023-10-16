const Video = require("../models/videoModel");

// Get a list of all videos
const getAllVideos = (req, res) => {
  Video.findAll()
    .then((videos) => {
      res.json(videos);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to retrieve videos" });
    });
};

// Get a video by ID
const getVideoById = (req, res) => {
  const { id } = req.params;
  Video.findAll({
    where: {
      video_id: id,
    },
  })
    .then((videos) => {
      res.json(videos);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to retrieve videos" });
    });
};

// Create a new video
const createVideo = (req, res) => {
  const { title, description } = req.body;
  Video.create({ title, description })
    .then((video) => {
      res.json(video);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to create video" });
    });
};

// Update a video by ID
const updateVideo = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  Video.update(
    { title },
    {
      where: {
        video_id: id,
      },
    }
  )
    .then((result) => {
      res.json({ success: true, message: "Video updated" });
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to update video" });
    });
};

// Delete a video by title
const deleteVideo = (req, res) => {
  const { title } = req.params;
  Video.destroy({
    where: {
      title,
    },
  })
    .then((result) => {
      res.json({ success: true, message: "Video deleted" });
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
