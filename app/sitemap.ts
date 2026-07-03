import { MetadataRoute } from "next";

const BASE_URL = "https://jacobyi.info";

const staticRoutes = [
  "",
  "/about",
  "/blog",
  "/work",
  "/contact",
  "/criminal-defense-websites",
];

type ButterPost = { slug: string; updated?: string };

async function getButterSlugs(): Promise<MetadataRoute.Sitemap> {
  const token = process.env.NEXT_APP_AUTH_TOKEN;
  if (!token) {
    return [];
  }

  try {
    const [postsRes, workRes] = await Promise.all([
      fetch(`https://api.buttercms.com/v2/posts/?auth_token=${token}`),
      fetch(
        `https://api.buttercms.com/v2/content/website_work_items/?auth_token=${token}`
      ),
    ]);

    const postsJson = postsRes.ok ? await postsRes.json() : { data: [] };
    const workJson = workRes.ok ? await workRes.json() : { data: {} };

    const posts: ButterPost[] = postsJson?.data ?? [];
    const workItems: ButterPost[] =
      workJson?.data?.website_work_items ?? [];

    const blogEntries = posts
      .filter((post) => Boolean(post?.slug))
      .map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: post.updated ? new Date(post.updated) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));

    const workEntries = workItems
      .filter((item) => Boolean(item?.slug))
      .map((item) => ({
        url: `${BASE_URL}/work/${item.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));

    return [...blogEntries, ...workEntries];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "monthly" : "monthly",
    priority: path === "" ? 1.0 : 0.8,
  }));

  const dynamicEntries = await getButterSlugs();

  return [...staticEntries, ...dynamicEntries];
}
