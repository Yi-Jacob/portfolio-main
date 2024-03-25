"use client";
import { Navigation } from "../../components/nav";

type Props = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;

  const res = await fetch(
    `https://api.buttercms.com/v2/posts/${slug}?auth_token=${process.env.NEXT_APP_AUTH_TOKEN}`,
    {
      method: "GET",
    }
  );
  const repo = await res.json();

  return (
    <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation />
      <div className="mx-auto space-y-8 lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="items-center gap-3 grid ">
          <div className="pb-4 z-10 flex flex-col items-center">
            <a
              href={`/blog`}
              className="text-white	border border-white rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none hover:bg-white hover:text-black	 "
            >
              View All Blog
            </a>
          </div>
          <span className="text-white text-5xl font-display">
            {repo.data.title}
          </span>
          <div className="flex justify-center">
            <img
              src={repo.data.featured_image}
              className="h-1/4w-1/4 min-h-3.5place-self-center rounded-lg"
            ></img>
          </div>
          <div className="pb-4 z-10 flex flex-col text-white">
            <div dangerouslySetInnerHTML={{ __html: repo.data.body }} />
          </div>
          <div className="pb-4 z-10 flex flex-col items-center">
            <a
              href={`/blog`}
              className="text-white	border border-white rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none hover:bg-white hover:text-black	 "
            >
              View All Blog
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
