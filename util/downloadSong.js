const fs = require("fs");
const ytdl = require("ytdl-core");

async function download(id) {
  let valid = await ytdl.validateURL(id);

  if (valid) {
    let info = await ytdl.getBasicInfo(id);
    await ytdl(id).pipe(fs.createWriteStream(`${info.videoDetails.title}.mp3`));
    return "SUCCESS";
  }
}

module.exports = {
  download,
};
