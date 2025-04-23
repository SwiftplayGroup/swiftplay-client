import Client from "./Client.ts";
import { Forum as ForumType } from "@/types/forums";
import { CreateThreadPayload, Thread as ThreadType } from "@/types/threads";

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

  static async createThread(
    forumID: string,
    thread: CreateThreadPayload,
  ): Promise<ThreadType> {
    const data = await this.fetch(`/forums/${forumID}/threads`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Forum?.session?.token}`,
      },
      method: "POST",
      body: JSON.stringify(thread),
    });
    return data;
  }

  static async getFromID(forumID: string): Promise<Forum> {
    const data = await this.fetchForumByID(`/forums/${forumID}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return new Forum(data);
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
    path: `/forums/${string}/threads`,
    properties: {
      method: "POST";
      headers: {
        ["Content-Type"]: "application/json";
        Authorization: string;
      };
      body: string;
    },
  ): Promise<ThreadType>;

  static async fetch(
    ...parameters: Parameters<(typeof Client)["fetch"]>
  ): Promise<ForumType[] | ThreadType | any> {
    return super.fetch(...parameters);
  }

  static async fetchForumByID(
    path: `/forums/${string}`,
    properties: {
      method?: "GET";
      headers: { ["Content-Type"]: "application/json" };
    },
  ): Promise<ForumType> {
    return super.fetch(path, properties);
  }
}
