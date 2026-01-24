export function parseFormData<T extends string>(
  formData: FormData,
  fileKeys: T[]
) {
  const data: Record<string, string> = {};
  const files: Record<T, File[]> = {} as Record<T, File[]>;

  for (const key of fileKeys) {
    files[key] =
      formData
        .getAll(key)
        .filter((v): v is File => v instanceof File && v.size > 0) ?? [];
  }

  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") {
      data[key] = value;
    }
  }

  return { data, files };
}
