const fs = require('fs');
const path = require('path');
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath("C:/PATH_programs/ffmpeg.exe");

const videosDir = './videos';
const audiosDir = './audios';

if (!fs.existsSync(audiosDir)) {
  fs.mkdirSync(audiosDir);
}

// ffmpeg("./src/file1.mp4")
//   .outputOptions("-vn", "-ab", "128k", "-ar", "44100")
//   .toFormat("mp3")
//   .save("output.mp3")
//   .on("error", console.error)
//   .on("end", () => console.log("Conversion finished."));

fs.readdirSync(videosDir).forEach(file => {
  if (file.endsWith('.mp4')) {
    const inputPath = path.join(videosDir, file);
    const outputPath = path.join(audiosDir, `${path.basename(file, '.mp4')}.mp3`);

    ffmpeg(inputPath)
      .outputOptions('-vn', '-ab', '128k', '-ar', '44100')
      .toFormat('mp3')
      .save(outputPath)
      .on('error', console.error)
      .on('end', () => console.log(`Converted ${file}`));
  }
});