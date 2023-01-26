"use strict";
const path = require("path");
const fs = require("fs");
const settime = require("util").promisify(setTimeout);
const stat = require("util").promisify(require("fs").stat);
let timeAgo = "";

module.exports = async function (fastify, opts) {
  fastify.get("/", async function (request, reply) {
    const files = fs.readdirSync("./public/videos");

    const mainFiles = [];
    for (let i = 0; i < files.length; i++) {
      const stats = fs.statSync(`./public/videos/${files[i]}`)
      const currentTime = Date.now();
      const timeDifference = currentTime - stats.ctimeMs;
      
  
      if (timeDifference < 60000) {
          timeAgo = `${Math.round(timeDifference / 1000)} seconds ago`;
      } else if (timeDifference < 3600000) {
          timeAgo = `${Math.round(timeDifference / 60000)} minutes ago`;
      } else if (timeDifference < 86400000) {
          timeAgo = `${Math.round(timeDifference / 3600000)} hours ago`;
      } else if (timeDifference < 604800000) {
          timeAgo = `${Math.round(timeDifference / 86400000)} days ago`;
      } else if (timeDifference < 2419200000) {
          timeAgo = `${Math.round(timeDifference / 604800000)} weeks ago`;
      } else if (timeDifference < 29030400000) {
          timeAgo = `${Math.round(timeDifference / 2419200000)} months ago`;
      } else {
          timeAgo = `${Math.round(timeDifference / 29030400000)} years ago`;
      }
      //const result = await stat(files[3])
      //console.log(fs.statSync(`./public/videos/${files[i]}`).birthtime.toUTCString())
      mainFiles.push({
        path: `/videos/${files[i]}`,
        title: `${files[i].split("_")[0]}`,
        goalTime: `${files[i].split("_")[1]}`,
        game: `${files[i].split("_")[2].replace(".mp4", "")}`,
        timePosted: timeAgo,
        time: stats.ctimeMs,
        datalength: files.length
      });
    }
    const mainData = mainFiles.sort((a,b) => b.time - a.time);
    //await settime(100)
    let pageNumber = request.query.page;
    let videosPerPage = 6;
    // let start = (page - 1) * videosPerPage;
    // let end = page * videosPerPage;
    
    return mainData.slice((pageNumber - 1) * videosPerPage, pageNumber * videosPerPage);
  });
};

