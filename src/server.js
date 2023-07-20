require('dotenv').config();
const fs = require('fs');

const path = require('path');
const ffmpeg = require("fluent-ffmpeg");

const videosDir = './videos';
const audiosDir = './audios';

const ffmpegPath = process.env.FFMPEG_PATH || "C:/PATH_programs/ffmpeg.exe";
ffmpeg.setFfmpegPath(ffmpegPath);

if (!fs.existsSync(audiosDir)) {
  fs.mkdirSync(audiosDir);
}

/* Para fazer a conversão de um único arquivo */
// ffmpeg("./src/file1.mp4")
//   .outputOptions("-vn", "-ab", "128k", "-ar", "44100")
//   .toFormat("mp3")
//   .save("output.mp3")
//   .on("error", console.error)
//   .on("end", () => console.log("Conversion finished."));

/* Para fazer a conversão de todos os arquivos de uma pasta */
fs.readdir(videosDir, (err, files) => {
  if (err) {
    return console.error(`Error reading directory: ${err}`);
  }

  files.forEach(file => {
    // Check for other video formats
    if (file.endsWith('.mp4') || file.endsWith('.avi') || file.endsWith('.mov')) {
      const inputPath = path.join(videosDir, file);
      const outputPath = path.join(audiosDir, `${path.basename(file, path.extname(file))}.mp3`);

      ffmpeg(inputPath)
        .outputOptions('-vn', '-ab', '128k', '-ar', '44100')
        .toFormat('mp3')
        .save(outputPath)
        .on('error', (err) => console.error(`Error converting file: ${err}`))
        .on('end', () => console.log(`Converted ${file}`));
    }
  });
});