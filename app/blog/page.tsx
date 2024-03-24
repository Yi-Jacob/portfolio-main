"use client";
import { Navigation } from "../components/nav";
import React, { useState, useEffect } from "react";

export default function Blog() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.buttercms.com/v2/posts/?auth_token=${process.env.REACT_APP_AUTH_TOKEN}`,
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
        setData(jsonData.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className=" bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation />
      <div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
        <div className="max-w-2xl mx-auto my-4 lg:mx-0">
          <h2
            className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl"
            style={{ marginTop: "75px" }}
          >
            Blog
          </h2>
        </div>
      </div>
    </div>
  );
}
