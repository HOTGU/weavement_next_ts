import { getPlaiceholder } from "plaiceholder";

export default async (file: File) => {
  try {
    //create blur image
    const buffer = (await file.arrayBuffer()) as Buffer;
    const { base64 } = await getPlaiceholder(buffer, { size: 6 }); // 약 150 ~ 200 byte
    return base64;
  } catch (error) {}
};
