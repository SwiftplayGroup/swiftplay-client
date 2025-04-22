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
    const data = (await this.fetch(`/threads/${threadID}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Thread.session.token}`,
      },
      body: JSON.stringify(post),
    })) as Post;
    return data;
  }

  static async getFromID(threadID: string): Promise<Thread> {
    const data = await this.fetch(`/threads/${threadID}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return new Thread(data);
  }

  static async getReplies(threadID: string): Promise<Post[]> {
    const data = await this.fetch(`/threads/${threadID}/posts`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data as unknown as Post[];
  }

  static async fetch(
    path: `/threads/${string}`,
    properties: {
      method?: "GET";
      headers: { ["Content-Type"]: "application/json" };
    },
  ): Promise<Thread>;
  static async fetch(
    path: `/threads/${string}/posts`,
    properties: {
      method?: "GET" | "POST";
      headers: { ["Content-Type"]: "application/json"; Authorization?: string };
      body?: string;
    },
  ): Promise<Post[] | Post>;
  static async fetch(
    ...parameters: Parameters<(typeof Client)["fetch"]>
  ): Promise<Thread | Post[] | Post> {
    const result = await super.fetch(...parameters);
    if (Array.isArray(result)) {
      return result as Post[];
    }
    if (result.threadID) {
      return result as Post;
    }
    return new Thread(result as ThreadType);
  }
}
