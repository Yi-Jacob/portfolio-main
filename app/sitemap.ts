import { MetadataRoute } from "next";

const baseUrl = "https://jacobyi.info";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/work", "/blog", "/contact"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
