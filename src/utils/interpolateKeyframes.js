export function interpolateKeyframes(keyframes, time) {

  if (keyframes.length < 2) {
    throw new Error('At least two keyframes should be provided');
  }

  // Take the value of the first keyframe if the provided time is before it
  const firstKeyframe = keyframes[0];
  if (time < firstKeyframe.time) {
    return firstKeyframe.value;
  }

  // Take the value of the last keyframe if the provided time is after it
  const lastKeyframe = keyframes[keyframes.length - 1];
  if (time >= lastKeyframe.time) {
    return lastKeyframe.value;
  }

  // Find the keyframes before and after the provided time, like this:
  //
  //                   Time
  // ───  [Keyframe] ───┸───── [Keyframe] ──── [...]
  //
  let index;
  for (index = 0; index < keyframes.length - 1; index++) {
    if (keyframes[index].time <= time && keyframes[index + 1].time >= time) {
      break;
    }
  }

  const keyframe1 = keyframes[index];
  const keyframe2 = keyframes[index + 1];

  // Find out where the provided time falls between the two keyframes from 0 to 1
  let t = (time - keyframe1.time) / (keyframe2.time - keyframe1.time);

  // Apply easing
  if (keyframe2.easing === 'expo-out') {
    t = applyExponentialOutEasing(t);
  } else if (keyframe2.easing === 'cubic-in-out') {
    t = applyCubicInOutEasing(t);
  } else {
    // ... Implement more easing functions
  }

  // Return the interpolated value
  return keyframe1.value + (keyframe2.value - keyframe1.value) * t;
}

// Exponential out easing
function applyExponentialOutEasing(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

// Cubic in-out easing
function applyCubicInOutEasing(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
