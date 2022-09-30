import fs from 'fs';
import path from 'path';
import { loadImage } from 'canvas';
import { extractFramesFromVideo } from './extractFramesFromVideo.js';

export async function getVideoFrameReader(videoFilepath, tmpDir, frameRate) {

  // Extract frames using FFmpeg
  await extractFramesFromVideo(videoFilepath, path.join(tmpDir, 'frame-%04d.png'), frameRate);

  // Get the filepaths to the frames and sort them alphabetically
  // so we can read them back in the right order
  const filepaths = (await fs.promises.readdir(tmpDir))
    .map(file => path.join(tmpDir, file))
    .sort();

  let frameNumber = 0;

  // Return a function that returns the next frame every time it is called
  return async () => {

    // Load a frame image
    const frame = await loadImage(filepaths[frameNumber]);

    // Next time, load the next frame
    if (frameNumber < filepaths.length - 1) {
      frameNumber++;
    }

    return frame;
  };
}
