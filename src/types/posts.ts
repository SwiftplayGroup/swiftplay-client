export interface Post {
  _id: string;
  authorID: string;
  parentPostID?: string;
  title: string;
  content: string;
  threadID: string;
  forumID: string;
  embeddings: number[];
}

export type CreatePostPayload = Omit<Post, "id" | "embeddings">;
