const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

const app = express();

console.clear();
app.use(express.static("public"));
app.use(cors());
app.use(express.json());
dotenv.config();

//* Route for the home page:
app.get("/", (request, response) => {
  response.send(
    "<h1>Welcome to the Videos API.</h1><br/><h3>To request the videos list use the videos end point</h3><br/><a href='/videos'>/videos</a><br/><h3>To request a video by ID</h3><br/><a href='/videos/9c268c0a-83dc-4b96-856a-bb5ded2772b1'>/videos/9c268c0a-83dc-4b96-856a-bb5ded2772b1</a>"
  );
});

const videosRouter = require("./routes/videos.js");

app.use("/videos", videosRouter);

const PORT = process.env.PORT || 8081;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
