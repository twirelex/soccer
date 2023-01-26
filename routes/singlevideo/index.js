"use strict";
const path = require("path");
const fs = require("fs");
const settime = require("util").promisify(setTimeout);
const stat = require("util").promisify(require("fs").stat);
let timeAgo = "";

module.exports = async function (fastify, opts) {
  fastify.get("/:name", async function (request, reply) {
    const files = fs.readdirSync("./public/videos");
      const singleFile = files.filter((video)=> video.includes(request.params.name + '.mp4'))
      if(singleFile.length > 0) {
        const stats = fs.statSync(`./public/videos/${singleFile[0]}`)
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
      //console.log(fs.statSync(`./public/videos/${singleFile[0]}`).birthtime.toUTCString())
      const result = {
        path: `/videos/${singleFile[0]}`,
        title: `${singleFile[0].split("_")[0]}`,
        goalTime: `${singleFile[0].split("_")[1]}`,
        game: `${singleFile[0].split("_")[2].replace(".mp4", "")}`,
        timePosted: timeAgo
      };
    
   
    
    return result
      }
      
  });
};