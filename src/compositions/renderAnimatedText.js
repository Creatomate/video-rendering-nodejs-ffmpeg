import { interpolateKeyframes } from '../utils/interpolateKeyframes.js';

export function renderAnimatedText(context, text, font, x, y, time) {

  if (time < 0) {
    return;
  }

  context.save();

  context.font = font;

  // Measure how the dimensions of the text
  const textMetrics = context.measureText(text);
  const fontHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;

  // Interpolate the y position of the text from 0 to the font size
  const offset = interpolateKeyframes([
    { time: 0, value: -fontHeight },
    { time: 1, value: 0, easing: 'expo-out' },
  ], time);

  // Clip to the bounding box of the text
  context.beginPath();
  context.rect(x, y - textMetrics.actualBoundingBoxAscent, textMetrics.width, fontHeight);
  context.clip();

  // Draw the text
  context.fillText(text, x, y + offset);

  context.restore();
}
