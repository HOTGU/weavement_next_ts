import imageCompression from "browser-image-compression";

export default async (
  // inputFiles: FileList,
  // stateFiles: File[],
  inputFile: File,
  width: number
) => {
  const imageOption = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: width || 1920,
    webWorker: true,
  };
  const compressedFile = await imageCompression(inputFile, imageOption);
  return compressedFile;
};
