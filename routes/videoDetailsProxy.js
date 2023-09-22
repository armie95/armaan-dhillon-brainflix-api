const axios = require("axios");

//* Reaching out to brainFlix api to get the video details by videoId:
const getVideoDetails = (req, res, videoId) => {
  const API_KEY = process.env.API_KEYS;

  // Use your Heroku app's URL instead of the hardcoded URL
  const herokuAppURL = "https://armieflixapp-b2fd52d51814.herokuapp.com";

  axios
    .get(`${herokuAppURL}/videos/${videoId}${API_KEY}`)

    .then((axiosResponse) => {
      res.status(200).json({
        status: "success",
        data: { ...axiosResponse.data },
      });
    })

    .catch((e) => {
      res
        .status(500)
        .json({ status: "fail", message: `Got an error: ${String(e)}` });
    });
};

module.exports = getVideoDetails;
