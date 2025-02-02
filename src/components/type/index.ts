
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
    tags?: Tag[];
    url: string;
  }
  