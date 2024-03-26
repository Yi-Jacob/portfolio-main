"use client";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import React, { useState, useEffect } from "react";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

export default function PostPage({ params }: Props) {
  const [project, setProject] = useState<{
    slug: string;
    link: string;
    title: string;
    description: string;
    repository: string;
    personal_description: string;
    list_items: string;
  } | null>(null); // Specify the type of project explicitly
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.buttercms.com/v2/content/website_work_items/?auth_token=dd6aeff1e466e9efbec81ee2ca68e5e5f30c5db0`,
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
        const project = projects.find((project: any) => project.slug === slug);
        setProject(project);
      } catch (error) {
        // Handle error
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params?.slug]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!project) {
    return <div>No project found</div>;
  }

  return (
    <div className="bg-zinc-50 min-h-screen">
      <Header project={project} />
      <div className="container flex md:justify-center min-h-screen px-4 mx-auto">
      <ReportView slug={project.slug} />
      <div className="flex justify-center mt-10 mx-auto py-5 px-3">
        <div className="mx-auto max-w-2xl lg:mx-0 block">
          <p>{project.personal_description}</p>
          <div className="mx-auto max-w-2xl lg:mx-0 block mt-3">
            <div className="work-items" dangerouslySetInnerHTML={{ __html: project.list_items }} />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
