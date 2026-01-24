import imageCompression from "browser-image-compression";

const compressImage = async (file: File): Promise<File> => {
  const compressed = await imageCompression(file, {
    maxSizeMB: 1, // 최대 1MB
    maxWidthOrHeight: 1600,
    useWebWorker: true,
  });

  // 이미 File이면 그대로 반환
  if (compressed instanceof File) {
    return compressed;
  }

  // Blob인 경우 File로 변환
  return new File([compressed], file.name, {
    type: (compressed as Blob).type || file.type,
    lastModified: Date.now(),
  });
};

export default compressImage;
