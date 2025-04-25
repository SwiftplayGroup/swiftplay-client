import Client from "./Client.ts";
import { Thread as ThreadType } from "@/types/threads";
import { CreatePostPayload, Post } from "@/types/posts";

export default class Thread extends Client {
  _id: string;
  authorID: string;
  title: string;
  forumID: string;
  mainPostID?: string;
  embeddings: number[];

  constructor(properties: ThreadType) {
    super();
    this._id = properties._id;
    this.authorID = properties.authorID;
    this.title = properties.title;
    this.forumID = properties.forumID;
    this.mainPostID = properties.mainPostID;
    this.embeddings = properties.embeddings;
  }

  static async createPost(
    threadID: string,
    post: CreatePostPayload,
  ): Promise<Post> {
    if (!Thread.session?.token) {
      throw new Error("User is not authenticated");
    }
    console.log(post);

    const data = await this.fetch<Post>(`/threads/${threadID}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Thread.session.token}`,
      },
      body: JSON.stringify(post),
    });
    console.log(data);
    return data;
  }

  static async getFromID(threadID: string): Promise<Thread> {
    const data = await this.fetch<ThreadType>(`/threads/${threadID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return new Thread(data);
  }

  static async getReplies(threadID: string): Promise<Post[]> {
    return await this.fetch<Post[]>(`/threads/${threadID}/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static async getRecommendedThreads(
    userID: string,
  ): Promise<{ recommendedThreads: Thread[] }> {
    const data = await this.fetch<{ recommendedThreads: Thread[] }>(
      `/threads/recommended/${userID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return data;
  }
  static async getAllThreads(): Promise<Thread[]> {
    const data = await this.fetch<Thread[]>(`/threads`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  }

  static async fetch<T>(
    path: string,
    properties: {
      method?: "GET" | "POST";
      headers: { ["Content-Type"]: "application/json"; Authorization?: string };
      body?: string;
    },
  ): Promise<T> {
    const result = await super.fetch(path, properties);
    return result;
  }
}
