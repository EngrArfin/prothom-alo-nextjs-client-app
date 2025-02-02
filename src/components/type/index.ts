// /types/article.ts

export interface TArticle {
    _id: string;
    title: string;
    image?: string;
    summary?: string;
    link: string;
  }
  
  // /types/story.ts
  
  export interface Tag {
    id: string;
    name: string;
    slug?: string; // Optional: if slug is part of tag, you can add this field
  }
  
  export interface Story {
    id: string;
    headline: string;
    "hero-image-s3-key"?: string;
    "hero-image-caption"?: string;
    "author-name": string;
    "last-published-at": string;
    metadata?: {
      excerpt?: string;
    };
    tags?: Tag[]; // Array of tags
    url: string;
    // Optionally, include other fields from the article if necessary, like:
    // articleDetails?: TArticle;  // If you want to associate an article with the story.
  }
  