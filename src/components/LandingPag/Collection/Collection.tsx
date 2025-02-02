"use client";
import { useState, useEffect } from "react";
import { Story } from "@/components/type";  
import { fetchCollectionData } from "@/utils/api";

interface CollectionPageProps {
  collectionName: string;
}

export default function CollectionPage({ collectionName }: CollectionPageProps) {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStories = async () => {
      try {
        const fetchedStories = await fetchCollectionData(collectionName);
        setStories(fetchedStories);
      } catch (err) {
        setError("Failed to fetch collection data.");
      } finally {
        setLoading(false);
      }
    };

    loadStories();
  }, [collectionName]);  

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story) => (
          <div
            key={story.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
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
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{story.headline}</h2>
              <p className="text-gray-600 text-sm mb-4">{story["author-name"] || "Unknown Author"}</p>
              {story["hero-image-caption"] && (
                <p className="text-gray-600 text-sm italic mb-4">
                  {story["hero-image-caption"]}
                </p>
              )}
              <div className="flex justify-between items-center mt-4">
                <a
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
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
