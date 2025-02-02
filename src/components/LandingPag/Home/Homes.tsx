"use client";

import { useState, useEffect } from "react";
import { fetchAllStories } from "@/utils/api";
import { Story } from "@/components/type";

export default function Home() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStories = async () => {
      try {
        const fetchedStories = await fetchAllStories();
        setStories(fetchedStories);
      } catch (err) {
        setError("Failed to fetch stories.");
      } finally {
        setLoading(false);
      }
    };

    loadStories();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <span className="text-xl font-semibold text-gray-600">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-8">
        <span className="text-xl font-semibold text-red-600">{error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {stories.map((story) => (
          <div
            key={story.id}
            className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200 transition-transform transform hover:scale-105"
          >
            <div className="relative">
              {story["hero-image-s3-key"] && (
                <img
                  src={`https://images.prothomalo.com/${story["hero-image-s3-key"]}`}
                  alt={story["hero-image-caption"] || "Story Image"}
                  className="w-full h-56 object-cover"
                />
              )}
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-sky-800 mb-4 leading-tight">
                {story.headline}
              </h2>
              <p className="text-red-600 text-sm mb-4">
                {story["author-name"] || "Unknown Author"}
              </p>
              {story["hero-image-caption"] && (
                <p className="text-gray-500 text-sm italic mb-4">
                  {story["hero-image-caption"]}
                </p>
               
              )}
              {story.tags && story.tags.length > 0 && (
                <div className="mt-4">
                  <ul className="list-disc pl-5 text-gray-600 text-sm">
                    {story.tags.map((tag) => (
                      <li key={tag.id} className="mb-1">
                        <strong className="text-gray-800 bg-red-200">{tag.name}</strong>
                       
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex justify-between items-center mt-6">
                <a
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-blue-600 hover:text-yellow-500 hover:underline"
                >
                  Read Full Story
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
