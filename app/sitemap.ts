import prisma from "@/libs/prismadb";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const URL = "https://weavement.co.kr";
  const routes = ["", "/contact", "/portfolio", "/aboutus"];
  const portfolios = await prisma.portfolio.findMany({
    orderBy: { createdAt: "desc" },
  });

  const portfoliosSiteUrl = portfolios.map((portfolio) => {
    return {
      url: `${URL}/portfolio/${portfolio.id}`,
      lastModified: portfolio.createdAt,
    };
  });

  const routesSiteUrl = routes.map((route) => {
    return {
      url: `${URL}${route}`,
      lastModified: new Date().toISOString(),
    };
  });

  return [...portfoliosSiteUrl, ...routesSiteUrl];
}
