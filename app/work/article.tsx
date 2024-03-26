import type { Project } from "@/.contentlayer/generated";
import Link from "next/link";

interface BlogData {
  featured_image: string;
  seo_title: string;
  slug: string;
  summary: string;
  categories: [{ name: string; slug: string }];
}

type Props = {
  blog: BlogData;
  views: number;
};

export const Article: React.FC<Props> = ({ blog }) => {
  return (
    <Link href={`/blog/${blog?.slug}`}>
      <article className="p-4 md:p-8">
        <h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display">
          {blog?.seo_title}
        </h2>
        <p className="z-20 mt-4 text-sm  duration-1000 text-zinc-400 group-hover:text-zinc-200">
          {blog?.summary}
        </p>
        <p className="mt-2 text-zinc-200 hover:text-zinc-50 lg:block">
          Read more <span aria-hidden="true">&rarr;</span>
        </p>
      </article>
    </Link>
  );
};
