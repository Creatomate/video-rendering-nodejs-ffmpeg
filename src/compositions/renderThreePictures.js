import { interpolateKeyframes } from '../utils/interpolateKeyframes.js';
import { renderPolaroidPicture } from './renderPolaroidPicture.js';

export function renderThreePictures(context, image1, image2, image3, width, height, time) {

  if (time < 0) {
    return;
  }

  // Animate the x position
  const x = interpolateKeyframes([
    { time: 0, value: 0.4265 },
    { time: 7.63, value: -0.2377 },
  ], time);

  context.save();

  context.translate(x * width, 0.0578 * height);

  // Render each picture
  renderPicture1(context, image1, width, height, time);
  renderPicture2(context, image2, width, height, time - 1.8);
  renderPicture3(context, image3, width, height, time - 3.6);

  context.restore();
}

function renderPicture1(context, image1, width, height, time) {

  if (time < 0) {
    return;
  }

  // Animation the x, y and rotation

  const x = interpolateKeyframes([
    { time: 0, value: 0.1672 },
    { time: 1.4, value: 0.0945, easing: 'expo-out' },
  ], time);

  const y = interpolateKeyframes([
    { time: 0, value: 1.1363 },
    { time: 1.4, value: 0.0454, easing: 'expo-out' },
  ], time);

  const rotate = interpolateKeyframes([
    { time: 0, value: 30.12 },
    { time: 1.4, value: 14.67, easing: 'expo-out' },
  ], time);

  context.save();

  context.translate(x * width, y * height);
  context.rotate(rotate * Math.PI / 180);

  renderPolaroidPicture(context, image1, 'Caption 1', 0.3201 * width, 0.7229 * height);

  context.restore();
}

function renderPicture2(context, image1, width, height, time) {

  if (time < 0) {
    return;
  }

  // Animation the x, y and rotation

  const x = interpolateKeyframes([
    { time: 0, value: 0.317 },
    { time: 1.4, value: 0.3758, easing: 'expo-out' },
  ], time);

  const y = interpolateKeyframes([
    { time: 0, value: 1.3707 },
    { time: 1.4, value: 0.2792, easing: 'expo-out' },
  ], time);

  const rotate = interpolateKeyframes([
    { time: 0, value: -30.63 },
    { time: 1.4, value: -4.43, easing: 'expo-out' },
  ], time);

  context.save();

  context.translate(x * width, y * height);
  context.rotate(rotate * Math.PI / 180);

  renderPolaroidPicture(context, image1, 'Caption 2', 0.3201 * width, 0.7229 * height);

  context.restore();
}

function renderPicture3(context, image1, width, height, time) {

  if (time < 0) {
    return;
  }

  // Animation the x, y and rotation

  const x = interpolateKeyframes([
    { time: 0, value: 0.6506 },
    { time: 1.4, value: 0.6801, easing: 'expo-out' },
  ], time);

  const y = interpolateKeyframes([
    { time: 0, value: 1.2748 },
    { time: 1.4, value: 0, easing: 'expo-out' },
  ], time);

  const rotate = interpolateKeyframes([
    { time: 0, value: -25.31 },
    { time: 1.4, value: 1.69, easing: 'expo-out' },
  ], time);

  context.save();

  context.translate(x * width, y * height);
  context.rotate(rotate * Math.PI / 180);

  renderPolaroidPicture(context, image1, 'Caption 3', 0.3201 * width, 0.7229 * height);

  context.restore();
}
