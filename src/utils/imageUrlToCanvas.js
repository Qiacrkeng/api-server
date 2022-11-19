const imageUrlToCanvas = (url, width, height) => {
  const image = new Image();
  image.url = url;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(image, 0, 0, width, height);
  return canvas;
};

export default imageUrlToCanvas;
