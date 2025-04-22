import Client from "./Client.ts";
import { Forum as ForumType } from "@/types/forums";

export default class Forum extends Client {
  _id: string;
  name: string;
  description: string;

  constructor(properties: ForumType) {
    super();
    this._id = properties._id;
    this.name = properties.name;
    this.description = properties.description;
  }

  static async getAll(): Promise<Forum[]> {
    const data = await this.fetch("/forums", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data.map((forum: ForumType) => new Forum(forum));
  }

  static async getThreads(forumID: string) {
    const data = await this.fetch(`/forums/${forumID}/threads`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  }

  static async fetch(
    path: "/forums",
    properties: {
      method?: "GET";
      headers: { ["Content-Type"]: "application/json" };
    },
  ): Promise<ForumType[]>;
  static async fetch(
    path: `/forums/${string}/threads`,
    properties: {
      method?: "GET";
      headers: { ["Content-Type"]: "application/json" };
    },
  ): Promise<any>;
  static async fetch(
    ...parameters: Parameters<(typeof Client)["fetch"]>
  ): Promise<ForumType[] | any> {
    return super.fetch(...parameters);
  }
}
