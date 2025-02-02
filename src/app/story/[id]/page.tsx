import axios from "axios";

interface Tag {
  id: string;
  name: string;
}

interface Story {
  id: string;
  headline: string;
  "hero-image-s3-key"?: string;
  "hero-image-caption"?: string;
  "author-name": string;
  "last-published-at": string;
  metadata?: {
    excerpt?: string;
  };
  tags?: Tag[];
  url: string;
}

async function fetchStory(id: string): Promise<Story | null> {
  try {
    const { data } = await axios.get("https://api.pewds.vercel.app/prothomalo/home/");
   
    console.log("API Response Data:", data); 
    const stories = data.collection.items[0]?.items.map((item: any) => item.story); 
    console.log("Stories List:", stories); 

    const foundStory = stories.find((story: Story) => story.id.toString() === id);

    if (!foundStory) {
      console.log(`No story found with id: ${id}`);
    }

    return foundStory || null;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error fetching story:", err.message);
    } else {
      console.error("Unknown error:", err);
    }
    return null;
  }
}

interface StoryDataProps {
  params: {
    id: string;
  };
}

export default async function StoryData({ params }: StoryDataProps) {
  const { id } = params;
  
  const story = await fetchStory(id);

  if (!story) {
    return (
      <div className="text-center text-red-500 mt-10">
        Story not found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold">{story.headline}</h1>

      {story["hero-image-s3-key"] && (
        <img
          src={`https://images.prothomalo.com/${story["hero-image-s3-key"]}`}
          alt={story["hero-image-caption"] || "News Image"}
          className="w-full h-80 object-cover rounded-lg"
        />
      )}

      <div className="mt-4">
        <p className="text-sm text-gray-500">
          By {story["author-name"]} |{" "}
          {new Date(story["last-published-at"]).toLocaleDateString()}
        </p>

        <p className="text-lg text-gray-700 mt-4">
          {story.metadata?.excerpt || "No content available."}
        </p>

        <div className="flex flex-wrap gap-2 mt-2">
          {story.tags?.map((tag: Tag) => (
            <span
              key={tag.id}
              className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>

      <a
        href={story.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-end inline-block mt-3 text-blue-600 hover:underline"
      >
        Go to Full Article →
      </a>
    </div>
  );
}
