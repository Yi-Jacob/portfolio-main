"use client";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import React, { useEffect, useState } from "react";

type ProjectDetail = {
  slug: string;
  link?: string;
  title: string;
  description: string;
  repository?: string;
  personal_description?: string;
  list_items?: string;
  role?: string | null;
  stack?: string | null;
  focus?: string | null;
  cover_image?: string | null;
  images?: string | Array<string | { url?: string; src?: string }> | null;
};

type Props = {
  slug: string;
};

export function WorkDetail({ slug }: Props) {
  const [project, setProject] = useState<ProjectDetail | null>(null);
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
        const projects = jsonData.data.website_work_items;
        const foundProject = projects.find(
          (projectItem: ProjectDetail) => projectItem.slug === slug
        );
        setProject(foundProject);
      } catch {
        setError("Unable to load this project.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="bg-zinc-50 min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-zinc-600 text-base sm:text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-zinc-50 min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-red-600 text-base sm:text-lg">{error}</div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="bg-zinc-50 min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-zinc-600 text-base sm:text-lg">No project found</div>
        </div>
      </div>
    );
  }

  const hasMeta = Boolean(project.role || project.stack || project.focus);

  // Handle images field: can be string, array, or null
  let galleryImages: string[] = [];
  if (typeof project.images === "string") {
    galleryImages = [project.images];
  } else if (Array.isArray(project.images)) {
    galleryImages = project.images
      .map((image) => {
        if (typeof image === "string") return image;
        return image?.url || image?.src || null;
      })
      .filter((img): img is string => Boolean(img));
  }

  // Use cover_image first, then first image from images array, then fallback
  const heroImage = project.cover_image || galleryImages[0] || null;
  const hasMultipleImages = galleryImages.length > 1;

  return (
    <div className="bg-zinc-50 min-h-screen overflow-x-hidden">
      <Header project={project} />
      <ReportView slug={project.slug} />

      <main className="w-full max-w-full mx-auto px-4 sm:px-6 md:px-8 pb-12 sm:pb-16 pt-6 sm:pt-8 md:pt-12">
        <article className="w-full max-w-4xl mx-auto">
          {/* Hero image */}
          {heroImage && (
            <div className="mb-6 sm:mb-8 md:mb-12 w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImage}
                alt={`${project.title} - ${project.description || "Project hero image"}`}
                className="w-full h-auto max-w-full rounded-lg shadow-lg"
                loading="eager"
              />
            </div>
          )}

          {/* Role / Stack / Focus - stacked vertically */}
          {hasMeta && (
            <div className="mb-8 sm:mb-12 md:mb-16 w-full" aria-label="Project metadata">
              <div className="flex flex-col gap-3 sm:gap-4 text-sm sm:text-base text-zinc-600 w-full">
                {project.role && (
                  <div className="break-words w-full">
                    <span className="font-medium text-zinc-500">Role</span>
                    <span className="ml-2">{project.role}</span>
                  </div>
                )}
                {project.stack && (
                  <div className="break-words w-full">
                    <span className="font-medium text-zinc-500">Stack</span>
                    <span className="ml-2">{project.stack}</span>
                  </div>
                )}
                {project.focus && (
                  <div className="break-words w-full">
                    <span className="font-medium text-zinc-500">Focus</span>
                    <span className="ml-2">{project.focus}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Overview section */}
          {project.personal_description && (
            <section className="mb-8 sm:mb-12 md:mb-16 w-full" aria-labelledby="overview-heading">
              <h2 id="overview-heading" className="text-xl sm:text-2xl md:text-3xl font-semibold text-zinc-900 mb-3 sm:mb-4 md:mb-6 break-words">
                Overview
              </h2>
              <p className="text-zinc-700 leading-6 sm:leading-7 md:leading-8 text-sm sm:text-base md:text-lg break-words w-full">
                {project.personal_description}
              </p>
            </section>
          )}

          {/* My Contributions section */}
          {project.list_items && (
            <section className="mb-8 sm:mb-12 md:mb-16 w-full" aria-labelledby="contributions-heading">
              <h2 id="contributions-heading" className="text-xl sm:text-2xl md:text-3xl font-semibold text-zinc-900 mb-3 sm:mb-4 md:mb-6 break-words">
                My Contributions
              </h2>
              <div
                className="work-items text-zinc-700 leading-6 sm:leading-7 space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg break-words w-full overflow-x-hidden"
                dangerouslySetInnerHTML={{ __html: project.list_items }}
              />
            </section>
          )}

          {/* Gallery - only if multiple images */}
          {hasMultipleImages && (
            <section className="mt-8 sm:mt-12 md:mt-20 w-full" aria-labelledby="gallery-heading">
              <h2 id="gallery-heading" className="text-xl sm:text-2xl md:text-3xl font-semibold text-zinc-900 mb-4 sm:mb-6 md:mb-8 break-words">
                Gallery
              </h2>
              <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 w-full">
                {galleryImages.slice(1).map((image, index) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={`${image}-${index}`}
                    src={image}
                    alt={`${project.title} - Additional view ${index + 2}`}
                    className="w-full h-auto max-w-full rounded-lg shadow-md"
                    loading="lazy"
                  />
                ))}
              </div>
            </section>
          )}

          {/* External website link */}
          {project.link && (
            <div className="mt-8 sm:mt-12 md:mt-16 pt-4 sm:pt-6 md:pt-8 border-t border-zinc-200 w-full">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm sm:text-base md:text-lg text-zinc-700 hover:text-zinc-900 font-medium transition-colors break-words"
              >
                Visit Website <span aria-hidden="true" className="ml-2">&rarr;</span>
              </a>
            </div>
          )}
        </article>
      </main>
    </div>
  );
}
