'use strict'
const fs = require('fs')
const path = require('path')
const os = require('os')
const ffmpeg = require('fluent-ffmpeg')
require('dotenv').config()

module.exports = async function (fastify, opts) {
  fastify.post('/', async function (request, reply) {
    const data = await request.file()
   
     const buffered = await data.toBuffer()
     //if(data.fields.password.value !== process.env.authenticate) return reply.sendFile('notfound.html')
    const filename = path.join(__dirname, '../../public/videos/') + data.fields.name.value.split(' ').join('-') +
     '_' + 
     data.fields.gameTime.value.split(' ').join('-') 
     + '_' 
     + data.fields.game.value.split(' ').join('-') + 
     '.mp4'
    
     const myfile = fs.createWriteStream(filename)
     myfile.on('finish', ()=> {
      ffmpeg.setFfmpegPath(path.join(__dirname, '../../../../../../ffmpeg/bin/ffmpeg.exe'))
      ffmpeg.setFfprobePath(path.join(__dirname, '../../../../../../ffmpeg/bin/ffmpeg.exe'))
      const command = ffmpeg(filename).screenshots({
      timestamps: [2],
      filename: filename.split('\\').reverse()[0].replace('.mp4','.png'),
      folder: './public/photos',
      size: '320x240'
      })
     })
     ///myfile.write(buffered)
     myfile.end(buffered)
     
     

     return reply.redirect('upload.html')
   
    
  })
}