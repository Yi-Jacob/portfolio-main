"use client";
import Link from "next/link";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { Redis } from "@upstash/redis";
import { Eye } from "lucide-react";
import React, { useState, useEffect } from "react";
import Butter from "buttercms";
const butter = Butter(`${process.env.NEXT_APP_AUTH_TOKEN}`);


// const redis = Redis.fromEnv();

export const revalidate = 60;
export default function ProjectsPage() {

  const [data, setData] = useState<Array<{ slug: string; date: string; title: string; description: string }> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

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
        setData(jsonData.data.website_work_items);
      } catch (error) {
        // setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Work
          </h2>
          <p className="mt-4 text-zinc-400">
          A compilation of my work and development projects, reflecting a fusion of creativity, expertise, and a relentless drive for innovation.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />

        {isLoading && <div className="text-white block mx-auto">Loading...</div>}
        <div className="w-full grid md:grid-cols-3 gap-5">
          {
            data &&
            data.map(project => {
              return (
                <Card key={project.slug}>
                  <Link href={`/work/${project.slug}`}>
                    <article className="p-4 md:p-8 flex flex-col justify-between">
                      <h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display">
                        {project.title}
                      </h2>
                      <p className="z-20 mt-4 text-sm  duration-1000 text-zinc-400 group-hover:text-zinc-200">
                        {project.description}
                      </p>
                      <Link href={`/work/${project.slug}`} className="z-20 mt-6 text-sm  duration-1000 text-zinc-400 group-hover:text-zinc-200">
                        Learn More <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </article>
                  </Link>
                </Card>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}
