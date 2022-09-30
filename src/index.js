import fs from 'fs';
import ffmpegStatic from 'ffmpeg-static';
import ffmpeg from 'fluent-ffmpeg';
import { Canvas, loadImage, registerFont } from 'canvas';
import { stitchFramesToVideo } from './utils/stitchFramesToVideo.js';
import { getVideoFrameReader } from './utils/getVideoFrameReader.js';
import { renderMainComposition } from './compositions/renderMainComposition.js';

// Tell fluent-ffmpeg where it can find FFmpeg
ffmpeg.setFfmpegPath(ffmpegStatic);

// Clean up the temporary directories first
for (const path of ['out', 'tmp/output']) {
  if (fs.existsSync(path)) {
    await fs.promises.rm(path, { recursive: true });
  }
  await fs.promises.mkdir(path, { recursive: true });
}

// The video length and frame rate, as well as the number of frames required
// to create the video
const duration = 9.15;
const frameRate = 60;
const frameCount = Math.floor(duration * frameRate);

console.log('Extracting frames from video 1...');
const getVideo1Frame = await getVideoFrameReader(
  'assets/pexels-4782135.mp4',
  'tmp/video-1',
  frameRate,
);

console.log('Extracting frames from video 2...');
const getVideo2Frame = await getVideoFrameReader(
  'assets/pexels-3576378.mp4',
  'tmp/video-2',
  frameRate,
);

console.log('Extracting frames from video 3...');
const getVideo3Frame = await getVideoFrameReader(
  'assets/pexels-2829177.mp4',
  'tmp/video-3',
  frameRate,
);

const logo = await loadImage('assets/logo.svg');

// Load fonts so we can use them for drawing
registerFont('assets/caveat-medium.ttf', { family: 'Caveat' });
registerFont('assets/chivo-regular.ttf', { family: 'Chivo' });

const canvas = new Canvas(1280, 720);
const context = canvas.getContext('2d');

// Render each frame
for (let i = 0; i < frameCount; i++) {

  const time = i / frameRate;

  console.log(`Rendering frame ${i} at ${Math.round(time * 10) / 10} seconds...`);

  // Clear the canvas with a white background color. This is required as we are
  // reusing the canvas with every frame
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Grab a frame from our input videos
  const image1 = await getVideo1Frame();
  const image2 = await getVideo2Frame();
  const image3 = await getVideo3Frame();

  renderMainComposition(
    context,
    image1,
    image2,
    image3,
    logo,
    canvas.width,
    canvas.height,
    time,
  );

  // Store the image in the directory where it can be found by FFmpeg
  const output = canvas.toBuffer('image/png');
  const paddedNumber = String(i).padStart(4, '0');
  await fs.promises.writeFile(`tmp/output/frame-${paddedNumber}.png`, output);
}

console.log(`Stitching ${frameCount} frames to video...`);

await stitchFramesToVideo(
  'tmp/output/frame-%04d.png',
  'assets/catch-up-loop-119712.mp3',
  'out/video.mp4',
  duration,
  frameRate,
);
