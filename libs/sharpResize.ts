import sharp from "sharp";
import { promises as fs } from "fs";

export default async (
  buffer: ArrayBuffer,
  width: number,
  setWatermark?: boolean
) => {
  const input = await fs.readFile(process.cwd() + "/public/watermark.webp");

  if (setWatermark) {
    const sharpImage = await sharp(buffer)
      .composite([{ input, gravity: "southeast", top: 20, left: 20 }])
      .resize({ width })
      .toFormat("webp", {
        quality: 100,
      })
      .toBuffer();
    return sharpImage;
  } else {
    const sharpImage = await sharp(buffer)
      .resize({ width })
      .toFormat("webp", {
        quality: 100,
      })
      .toBuffer();
    return sharpImage;
  }
};
