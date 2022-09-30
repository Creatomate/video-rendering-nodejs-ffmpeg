import { interpolateKeyframes } from '../utils/interpolateKeyframes.js';
import { renderThreePictures } from './renderThreePictures.js';
import { renderOutro } from './renderOutro.js';

export function renderMainComposition(
  context,
  image1,
  image2,
  image3,
  logo,
  width,
  height,
  time,
) {

  // Interpolate the x position to create a slide effect between the polaroid pictures scene
  // and the outro scene
  const slideProgress = interpolateKeyframes([
    { time: 6.59, value: 0 },
    { time: 7.63, value: 1, easing: 'cubic-in-out' },
  ], time);

  // Scene 1 – The three polaroid pictures

  // Move the slide over 25% of the canvas width while adjusting its opacity with globalAlpha
  context.save();
  context.translate((0.25 * width) * -slideProgress, 0);
  context.globalAlpha = 1 - slideProgress;

  // Render the polaroid picture scene using relative sizes
  renderThreePictures(context, image1, image2, image3, 0.9636 * width, 0.8843 * height, time);

  context.restore();

  // Scene 2 – The outro

  // Move the slide over 25% of the canvas width while adjusting its opacity with globalAlpha
  context.save();
  context.translate((0.25 * width) * (1 - slideProgress), 0);
  context.globalAlpha = slideProgress;

  renderOutro(context, logo, width, height, time - 6.59);

  context.restore();
}
