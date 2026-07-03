import { Metadata } from "next";
import { WorkDetail } from "./work-detail";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

type WorkItem = {
  slug: string;
  title?: string;
  description?: string;
  cover_image?: string | null;
};

async function getWorkItem(slug: string): Promise<WorkItem | null> {
  const token = process.env.NEXT_APP_AUTH_TOKEN;
  if (!token) {
    return null;
  }

  try {
    const res = await fetch(
      `https://api.buttercms.com/v2/content/website_work_items/?auth_token=${token}`
    );
    if (!res.ok) {
      return null;
    }
    const json = await res.json();
    const items: WorkItem[] = json?.data?.website_work_items ?? [];
    return items.find((item) => item.slug === slug) ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await getWorkItem(params.slug);

  const title = item?.title ?? "Work";
  const description =
    item?.description ??
    "A development project by Jacob Yi.";

  return {
    title,
    description,
    alternates: {
      canonical: `/work/${params.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://jacobyi.info/work/${params.slug}`,
      siteName: "jacobyi.info",
      images: item?.cover_image
        ? [{ url: item.cover_image, width: 1200, height: 630 }]
        : undefined,
      locale: "en-US",
      type: "article",
    },
  };
}

export default function PostPage({ params }: Props) {
  return <WorkDetail slug={params.slug} />;
}
