import axios from 'axios';
import { Story } from '../components/type/index';  // Ensure the Story type is defined appropriately.

const fetchStoriesFromUrl = async (url: string): Promise<Story[]> => {
  try {
    const { data } = await axios.get(url);
    const stories = data.collection.items[0]?.items.map((item: any) => item.story);
    return stories || [];
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error fetching stories:", err.message);
    } else {
      console.error("Unknown error:", err);
    }
    return [];
  }
}

export async function fetchCollectionData(name: string): Promise<Story[]> {
  const url = `https://api.pewds.vercel.app/prothomalo/collection/${name}?start_from=0&per_page=15`;
  return fetchStoriesFromUrl(url);
}

export async function fetchAllStories(): Promise<Story[]> {
  const url = "https://api.pewds.vercel.app/prothomalo/home/";
  return fetchStoriesFromUrl(url);
}
