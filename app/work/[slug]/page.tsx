"use client";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import React, { useEffect, useState } from "react";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

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

export default function PostPage({ params }: Props) {
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
        const slug = params?.slug;
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
  }, [params?.slug]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!project) {
    return <div>No project found</div>;
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
    <div className="bg-zinc-50 min-h-screen">
      <Header project={project} />
      <ReportView slug={project.slug} />
      
      <main className="container mx-auto px-4 pb-16 pt-12">
        <article className="mx-auto max-w-4xl">
          {/* Role / Stack / Focus strip - compact horizontal */}
          {hasMeta && (
            <div className="mb-10" aria-label="Project metadata">
              <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-zinc-600">
                {project.role && (
                  <div>
                    <span className="font-medium text-zinc-500">Role</span>
                    <span className="ml-2">{project.role}</span>
                  </div>
                )}
                {project.stack && (
                  <div>
                    <span className="font-medium text-zinc-500">Stack</span>
                    <span className="ml-2">{project.stack}</span>
                  </div>
                )}
                {project.focus && (
                  <div>
                    <span className="font-medium text-zinc-500">Focus</span>
                    <span className="ml-2">{project.focus}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Hero image */}
          {heroImage && (
            <div className="mb-16">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImage}
                alt={`${project.title} - ${project.description || "Project hero image"}`}
                className="w-full h-auto rounded-lg shadow-lg"
                loading="eager"
              />
            </div>
          )}

          {/* Overview section */}
          {project.personal_description && (
            <section className="mb-16" aria-labelledby="overview-heading">
              <h2 id="overview-heading" className="text-3xl font-semibold text-zinc-900 mb-6">
                Overview
              </h2>
              <p className="text-zinc-700 leading-8 text-lg">{project.personal_description}</p>
            </section>
          )}

          {/* My Contributions section */}
          {project.list_items && (
            <section className="mb-16" aria-labelledby="contributions-heading">
              <h2 id="contributions-heading" className="text-3xl font-semibold text-zinc-900 mb-6">
                My Contributions
              </h2>
              <div
                className="work-items text-zinc-700 leading-7 space-y-3"
                dangerouslySetInnerHTML={{ __html: project.list_items }}
              />
            </section>
          )}

          {/* Gallery - only if multiple images */}
          {hasMultipleImages && (
            <section className="mt-20" aria-labelledby="gallery-heading">
              <h2 id="gallery-heading" className="text-3xl font-semibold text-zinc-900 mb-8">
                Gallery
              </h2>
              <div className="grid gap-8 sm:grid-cols-2">
                {galleryImages.slice(1).map((image, index) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={`${image}-${index}`}
                    src={image}
                    alt={`${project.title} - Additional view ${index + 2}`}
                    className="w-full h-auto rounded-lg shadow-md"
                    loading="lazy"
                  />
                ))}
              </div>
            </section>
          )}

          {/* External website link */}
          {project.link && (
            <div className="mt-16 pt-8 border-t border-zinc-200">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-lg text-zinc-700 hover:text-zinc-900 font-medium transition-colors"
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
