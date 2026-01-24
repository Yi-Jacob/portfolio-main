"use client";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import React, { useEffect, useState } from "react";

type ProjectPreview = {
  slug: string;
  title: string;
  cover_image?: string | null;
  images?: string | Array<string | { url?: string; src?: string }> | null;
  role?: string | null;
  stack?: string | null;
  focus?: string | null;
};

export const revalidate = 60;

export default function ProjectsPage() {
  const [data, setData] = useState<ProjectPreview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.buttercms.com/v2/content/website_work_items/?auth_token=${process.env.NEXT_APP_AUTH_TOKEN}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        const projects = jsonData?.data?.website_work_items ?? [];
        setData(projects.reverse());
      } catch {
        setError("Unable to load projects.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative pb-12 sm:pb-16">
      <Navigation />
      <div className="px-4 sm:px-6 pt-16 sm:pt-20 mx-auto space-y-6 sm:space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Work
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-zinc-400">
            A compilation of my work and development projects, reflecting a fusion
            of creativity, expertise, and a relentless drive for innovation.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />

        {isLoading && <div className="text-white block mx-auto text-sm sm:text-base">Loading...</div>}
        {error && <div className="text-red-200 block mx-auto text-sm sm:text-base">{error}</div>}

        <div className="w-full grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((project) => {
            // Handle images field: can be string, array, or null
            let imageUrl: string | null = null;
            if (typeof project.images === "string") {
              imageUrl = project.images;
            } else if (Array.isArray(project.images) && project.images.length > 0) {
              const firstImage = project.images[0];
              imageUrl =
                typeof firstImage === "string"
                  ? firstImage
                  : firstImage?.url || firstImage?.src || null;
            }
            const coverImage =
              project.cover_image || imageUrl || "/og.png";
            const hasMetadata = Boolean(
              project.role || project.stack || project.focus
            );

            return (
              <Card key={project.slug}>
                <Link
                  href={`/work/${project.slug}`}
                  className="block h-full"
                  aria-label={`View ${project.title}`}
                >
                  <article className="relative flex h-full flex-col overflow-hidden">
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={coverImage}
                        alt={`${project.title} project cover image`}
                        className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4 sm:p-5 md:p-6">
                      <h3 className="text-lg sm:text-xl font-medium text-zinc-200 group-hover:text-white font-display">
                        {project.title}
                      </h3>
                    </div>

                    {/* Hover overlay - desktop only */}
                    <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-zinc-950/90 via-zinc-950/70 to-transparent opacity-0 transition-opacity duration-300 md:group-hover:opacity-100">
                      <div className="w-full p-4 sm:p-5 md:p-6 space-y-2 sm:space-y-3">
                        {hasMetadata && (
                          <div className="space-y-1 sm:space-y-1.5 text-xs sm:text-sm text-zinc-100">
                            {project.role && (
                              <div className="truncate">
                                <span className="text-zinc-300 font-medium">Role:</span>{" "}
                                <span>{project.role}</span>
                              </div>
                            )}
                            {project.stack && (
                              <div className="truncate">
                                <span className="text-zinc-300 font-medium">Stack:</span>{" "}
                                <span>{project.stack}</span>
                              </div>
                            )}
                            {project.focus && (
                              <div className="truncate">
                                <span className="text-zinc-300 font-medium">Focus:</span>{" "}
                                <span>{project.focus}</span>
                              </div>
                            )}
                          </div>
                        )}
                        <span className="inline-flex text-xs sm:text-sm font-semibold text-white mt-1 sm:mt-2">
                          Learn More <span aria-hidden="true">&rarr;</span>
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
