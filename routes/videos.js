const express = require("express");
const router = express.Router();
const fs = require("fs");
const getVideoDetails = require("./videoDetailsProxy");

const videos = JSON.parse(fs.readFileSync("./data/videos.json", "utf-8"));

//* Route to get the videos list:
router.get("", (req, res) => {
  res.status(200).json({
    status: "success",
    results: videos.length,
    data: videos,
  });
});

//* Route to get a video with additional details by ID:
router.get("/:id", (req, res) => {
  const id = req.params.id;

  const foundVideo = videos.find((video) => video.id === id);

  if (!foundVideo) {
    return res
      .status(404)
      .json({ status: "fail", message: "Record not found" });
  }

  getVideoDetails(req, res, id);
});

//* Route to post new vidies from the Front End to our API:
router.post("", (req, res) => {
  const videoInfo = req.body;

  res.json({ videoInfo });
});

module.exports = router;
