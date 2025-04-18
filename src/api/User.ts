/**
 * A class that represents a user.
 * 
 * Programmer: Christian Toney (https://github.com/Christian-Toney)
 * © 2025 Swiftplay Group
 */

import Client from "./Client.ts";
import HTTPError from "./errors/HTTPError.ts";
import Run from "./Run.ts";
import Session from "./Session.ts";

export type UserProperties = {
  _id: string;
  emailAddress?: string;
  username: string;
  favoriteRunID?: string;
  avatarURL?: string;
}

export type NewUserProperties = Omit<UserProperties, "_id"> & {
  password: string;
  emailAddress: string;
}

export default class User extends Client {

  _id: string;
  emailAddress?: string;
  favoriteRunID?: string;
  avatarURL?: string;
  username: string;

  constructor(properties: UserProperties) {

    super();
    this._id = properties._id;
    this.emailAddress = properties.emailAddress;
    this.favoriteRunID = properties.favoriteRunID;
    this.avatarURL = properties.avatarURL;
    this.username = properties.username;

  }

  static async createUser(properties: NewUserProperties): Promise<User> {

    const data = await this.fetch("/users", {
      method: "POST",
      body: JSON.stringify(properties),
      headers: {
        "Content-Type": "application/json"
      }
    })

    return new User(data);

  }

  static async getFromUsername(username: string): Promise<User> {

    const data = await this.fetch(`/users?username=${username}`, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    const userData = data[0];
    if (!userData) {

      throw new HTTPError(404, "User doesn't exist");

    }

    return new User(userData);

  }

  static async fetch(path: "/users", properties: {method: "POST", body: string, headers: {["Content-Type"]: "application/json"}}): Promise<UserProperties>;
  static async fetch(path: `/users?username=${string}`, properties: {method?: "GET", headers: {["Content-Type"]: "application/json"}}): Promise<UserProperties[]>;
  static async fetch(path: `/users/${string}/runs`, properties: {method?: "GET", headers: {["Content-Type"]: "application/json"}}): Promise<Run[]>;
  static async fetch(...parameters: Parameters<(typeof Client)["fetch"]>): Promise<UserProperties | UserProperties[] | Run[]> {

    return super.fetch(...parameters);

  }

  async createSession(password: string): Promise<Session> {

    return await Session.createSession({
      username: this.username,
      password
    });

  }

  async getRuns(): Promise<Run[]> {

    return await User.fetch(`/users/${this._id}/runs`, {
      headers: {
        "Content-Type": "application/json"
      }
    })

  }

}
