import { drawImageCoverFit } from '../utils/drawImageCoverFit.js';

export function renderPolaroidPicture(context, image, caption, width, height) {

  context.save();

  // Set a shadow
  context.shadowBlur = 16;
  context.shadowColor = 'rgba(0, 0, 0, 0.22)';
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 7;

  // Draw a white rectangle as the frame of the polaroid picture
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, width, height);

  context.restore();

  // Draw the image and make sure it fits in the available space
  drawImageCoverFit(context, image, 0.054 * width, 0.0466 * height, 0.8921 * width, 0.8048 * height);

  // Draw the caption
  context.font = `${0.09 * height}px 'Caveat Medium'`;
  context.fillText(caption, 0.05 * width, 0.95 * height);
}
