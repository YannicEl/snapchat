import sharp from 'sharp';

export const convertImg = (
  buffer: Buffer,
  fileType: string
): Promise<Buffer> => {
  switch (fileType) {
    case 'png':
      return sharp(buffer).png().toBuffer();

    case 'avif':
      return sharp(buffer).avif().toBuffer();

    case 'webp':
      return sharp(buffer).webp().toBuffer();

    default:
      throw new Error(`Unsupported filetype: ${fileType}`);
  }
};
