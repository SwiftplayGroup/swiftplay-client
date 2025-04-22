//This is for Likes

import Client from "./Client.ts";

export default class Like extends Client {
  _id: string;
  userID: string;
  postID: string; //perchance rename to targetID since it can be a post or thread

  constructor(properties: Like) {
    super();
    this._id = properties._id;
    this.userID = properties.userID;
    this.postID = properties.postID;
  }

  static async createLike(postID: string, userID: string): Promise<Like> {
    if (!Client?.session?.token) {
      throw new Error("User is not authenticated");
    }
    console.log("Creating like for postID:", postID, "and userID:", userID);
    const data = (await Like.fetch(`/posts/${postID}/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Client.session.token}`,
      },
      body: JSON.stringify({ userID, postID }),
    })) as Like;
    return data;
  }
  static async hasUserLiked(postID: string, userID: string): Promise<boolean> {
    if (!Client?.session?.token) {
      throw new Error("User is not authenticated");
    }
    const likes = await Like.fetch(`/posts/${postID}/likes?user-id=${userID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Client.session.token}`,
      },
    });

    return Array.isArray(likes) && likes.length > 0;
  }

  static async deleteLike(postID: string, userID: string): Promise<Like> {
    if (!Client?.session?.token) {
      throw new Error("User is not authenticated");
    }
    console.log("Deleting like for postID:", postID, "and userID:", userID);
    const data = (await Like.fetch(`/posts/${postID}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Client.session.token}`,
      },
      body: JSON.stringify({ userID, postID }),
    })) as Like;
    return data;
  }

  static async fetch(
    path: `/posts/${string}/likes${string | undefined}`,
    properties: {
      method?: "POST" | "GET" | "DELETE";
      headers: { ["Content-Type"]: "application/json"; Authorization?: string };
      body?: string;
    },
  ): Promise<Like> {
    return super.fetch(path, properties);
  }
}
