import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";

export default async (
  buffer: ArrayBuffer,
  width: number,
  setWatermark?: boolean
) => {
  if (setWatermark) {
    const filePath = path.join(process.cwd(), "public", "watermark.webp");
    const input = await fs.readFile(filePath);
    const sharpImage = await sharp(buffer)
      .composite([{ input, gravity: "southeast", top: 20, left: 20 }])
      .resize({ width })
      .toFormat("webp")
      .toBuffer();
    return sharpImage;
  } else {
    const sharpImage = await sharp(buffer)
      .resize({ width })
      .toFormat("webp")
      .toBuffer();
    return sharpImage;
  }
};
