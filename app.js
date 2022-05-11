const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");
const YD = require("./util/downloadSong");
const fs = require("fs");
const ytdl = require("ytdl-core");

const app = express();

app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(3000);
console.log("Listening on port 3000");

app.post("/download", async (req, res) => {
  if (req.body.id) {

    let info = await ytdl.getBasicInfo(req.body.id);
    await ytdl(req.body.id).pipe(
      fs.createWriteStream(`${info.videoDetails.title}.mp3`)
    );
    const file = `${info.videoDetails.title}.mp3`;
    setTimeout(() => {
      res.download(file);
    }, 3000);
  } else {
    res.status(400).send("NO LINK PROVIDED");
  }
});
