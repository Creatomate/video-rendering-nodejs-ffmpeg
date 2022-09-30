export function drawImageCoverFit(context, image, x, y, width, height) {

  // Calculate the dimensions of the image to make it cover the available space
  const scale = Math.max(width / image.width, height / image.height);
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  const drawX = x + (width - drawWidth) / 2;
  const drawY = y + (height - drawHeight) / 2;

  context.save();

  // Clip the parts of the image that overflow the provided bounding box
  context.beginPath();
  context.rect(x, y, width, height);
  context.clip();

  // Draw the image
  context.drawImage(image, drawX, drawY, drawWidth, drawHeight);

  context.restore();
}
