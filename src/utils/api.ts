import axios from 'axios';
import { Story } from '../components/type/index';  

export async function fetchAllStories(): Promise<Story[]> {
  try {
    const { data } = await axios.get("https://api.pewds.vercel.app/prothomalo/home/");
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
