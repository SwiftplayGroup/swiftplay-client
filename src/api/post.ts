import Client from "./Client.ts";
import { Post as PostType } from "@/types/posts";

export default class Post extends Client {
  _id: string;
  authorID: string;
  parentPostID?: string;
  title: string;
  content: string;
  threadID: string;
  forumID: string;
  embeddings: number[];

  constructor(properties: PostType) {
    super();
    this._id = properties._id;
    this.authorID = properties.authorID;
    this.parentPostID = properties.parentPostID;
    this.title = properties.title;
    this.content = properties.content;
    this.threadID = properties.threadID;
    this.forumID = properties.forumID;
    this.embeddings = properties.embeddings;
  }

  static async create(post: CreatePostPayload): Promise<Post> {
    if (!Post.session?.token) {
      throw new Error("User is not authenticated.");
    }

    const data = await this.fetch("/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Post.session.token}`,
      },
      body: JSON.stringify(post),
    });
    return new Post(data);
  }

  static async fetch(
    path: "/posts",
    properties: {
      method: "POST";
      headers: { ["Content-Type"]: "application/json"; Authorization: string };
      body: string;
    },
  ): Promise<PostType>;
  static async fetch(
    ...parameters: Parameters<(typeof Client)["fetch"]>
  ): Promise<PostType> {
    return super.fetch(...parameters);
  }
}
export type CreatePostPayload = Omit<Post, "_id" | "embeddings">;
