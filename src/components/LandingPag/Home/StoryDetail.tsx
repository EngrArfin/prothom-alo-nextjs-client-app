"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Story } from "@/components/type";  

const fetchStory = async (id: string): Promise<Story | null> => {
  try {
    const { data } = await axios.get("https://api.pewds.vercel.app/prothomalo/home/");
    const stories = data.collection.items[0]?.items.map((item: any) => item.story);
    return stories.find((story: Story) => story.id.toString() === id) || null;
  } catch (err) {
    console.error("Error fetching story:", err);
    return null;
  }
};

export default function StoryDetail({ params }: { params: { id: string } }) {
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      const getStory = async () => {
        try {
          const fetchedStory = await fetchStory(params.id);
          if (fetchedStory) {
            setStory(fetchedStory);
          } else {
            setError("Story not found.");
          }
        } catch (error) {
          setError("Failed to fetch story.");
        } finally {
          setLoading(false);
        }
      };
      getStory();
    }
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg space-y-6">
      <h2 className="text-3xl font-semibold text-gray-900">{story?.headline}</h2>

      {story?.["hero-image-s3-key"] && (
        <img
          src={`https://images.prothomalo.com/${story["hero-image-s3-key"]}`}
          alt={story["hero-image-caption"] || "Story Image"}
          className="w-full h-80 w-90 object-cover rounded-lg"
        />
      )}
      <p className="text-lg text-red-700 mt-4">{story?.metadata?.excerpt || "No content available."}</p>
      <a
        href={story?.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-6 px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg text-lg font-semibold transition-colors"
      >
        Read Full Story
      </a>
      
    </div>
  );
}
