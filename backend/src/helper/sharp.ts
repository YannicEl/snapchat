import sharp, {
  AvifOptions,
  JpegOptions,
  PngOptions,
  WebpOptions,
} from 'sharp';

export const defaultJpgOptions: JpegOptions = {
  progressive: true,
  mozjpeg: true,
};

export const defaultPngOptions: PngOptions = {
  progressive: true,
};

export const defaultAvifOptions: AvifOptions = {};

export const defaultWebpOptions: WebpOptions = {};

export const convertImg = (
  buffer: Buffer,
  fileType: string
): Promise<Buffer> => {
  switch (fileType) {
    case 'png':
      return sharp(buffer).png(defaultPngOptions).toBuffer();

    case 'jpg':
      return sharp(buffer).jpeg(defaultJpgOptions).toBuffer();

    case 'avif':
      return sharp(buffer).avif(defaultAvifOptions).toBuffer();

    case 'webp':
      return sharp(buffer).webp(defaultWebpOptions).toBuffer();

    default:
      throw new Error(`Unsupported filetype: ${fileType}`);
  }
};
