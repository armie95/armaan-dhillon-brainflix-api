const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const getVideoDetails = require("./videoDetailsProxy");

//* Route to get the videos list:
router.get("", (req, res) => {
  const videos = JSON.parse(fs.readFileSync("./data/videos.json", "utf-8"));

  res.status(200).json({
    status: "success",
    results: videos.length,
    data: videos,
  });
});

//* Route to get a video with additional details by ID:
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const videos = JSON.parse(fs.readFileSync("./data/videos.json", "utf-8"));

  const foundVideo = videos.find((video) => video.id === id);

  if (!foundVideo) {
    return res
      .status(404)
      .json({ status: "fail", message: "Record not found" });
  }

  getVideoDetails(req, res, id);
});

//* Route to post new video from the Front End to our API:
router.post("", (req, res) => {
  const videoInfo = req.body;

  const videos = JSON.parse(fs.readFileSync("./data/videos.json", "utf-8"));

  videoInfo.id = uuidv4();
  videoInfo.image =
    "https://armieflixapp-b2fd52d51814.herokuapp.com/images/upload-video-preview.jpg";

  videos.push(videoInfo);

  fs.writeFileSync("./data/videos.json", JSON.stringify(videos, null, 4));

  res.status(201).json(videoInfo);
});

module.exports = router;
