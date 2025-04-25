export interface Post {
  _id: string;
  authorID: string;
  parentPostID?: string;
  content: string;
  threadID: string;
  forumID: string;
  embeddings: number[];
}

export type CreatePostPayload = Omit<Post, "_id" | "embeddings">;
