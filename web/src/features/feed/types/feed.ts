export type FeedItem = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  
  likesCount: number;
  likedByCurrentUser: boolean;
  commentsCount: number;

  author: {
    id: string;
    name: string;
    username: string;
    image?: string;
  };

  project: {
    id: string;
    title: string;
  };
};

export type FeedPage = {
  items: FeedItem[];
  nextCursor: string | null;
};