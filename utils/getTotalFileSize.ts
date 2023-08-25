export default (files: File[]) => {
  let sumSize = 0;
  files.forEach((file) => {
    sumSize += file.size;
  });
  const totalMbSize = Math.ceil((sumSize / 1024 / 1024) * 100) / 100;
  return totalMbSize;
};
