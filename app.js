const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const YD = require("./util/downloadSong")

const app = express();

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(3000)
console.log("Listening on port 3000")

app.get("/test", (req, res) => {
    YD.download("ZFspOYo8wWQ")
    res.send("OK")
})