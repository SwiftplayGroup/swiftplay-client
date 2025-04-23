export interface Thread {
  _id: string;
  authorID: string;
  title: string;
  forumID: string;
  mainPostID?: string;
  embeddings: number[];
}

export type CreateThreadPayload = Omit<Thread, "_id" | "embeddings">;
