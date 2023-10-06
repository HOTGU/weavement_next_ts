import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://weavement.co.kr",
      lastModified: new Date(),
    },
    {
      url: "https://weavement.co.kr/contact",
      lastModified: new Date(),
    },
    {
      url: "https://weavement.co.kr/portfolio",
      lastModified: new Date(),
    },
  ];
}
