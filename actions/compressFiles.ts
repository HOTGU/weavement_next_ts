import imageCompression from "browser-image-compression";

export default async (
  inputFiles: FileList,
  stateFiles: File[],
  width: number
) => {
  const imageOption = {
    maxSizeMB: 1,
    maxWidthOrHeight: width || 2560,
    webWorker: true,
  };

  const filesNameArr = stateFiles.map((file) => {
    return file?.name;
  });

  let compressedFiles = [];

  for (let i = 0; i < inputFiles.length; i++) {
    if (!filesNameArr.includes(inputFiles[i].name)) {
      const compressedFile = await imageCompression(inputFiles[i], imageOption);
      compressedFiles.push(compressedFile);
    }
  }
  return compressedFiles;
};
