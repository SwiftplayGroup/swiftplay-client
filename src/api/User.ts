/**
 * A class that represents a user.
 * 
 * Programmer: Christian Toney (https://github.com/Christian-Toney)
 * © 2025 Swiftplay Group
 */

import Client from "./Client.ts";
import HTTPError from "./errors/HTTPError.ts";
import Permission, { PermissionAccessLevel } from "./Permission.ts";
import Run, { RunProperties } from "./Run.ts";
import Session from "./Session.ts";

export type UserProperties = {
  _id: string;
  emailAddress?: string;
  username: string;
  favoriteRunID?: string;
  avatarURL?: string;
  permissionOverrides?: {
    [permissionID: string]: PermissionAccessLevel;
  }
}

export type NewUserProperties = Omit<UserProperties, "_id"> & {
  password: string;
  emailAddress: string;
}

export type NewPermissionOverrides = {
  [permissionID: string]: PermissionAccessLevel | null;
};

export default class User extends Client {

  _id: string;
  emailAddress?: UserProperties["emailAddress"];
  favoriteRunID?: UserProperties["favoriteRunID"];
  avatarURL?: UserProperties["avatarURL"];
  username: UserProperties["username"];
  permissionOverrides?: UserProperties["permissionOverrides"];

  constructor(properties: UserProperties) {

    super();
    this._id = properties._id;
    this.emailAddress = properties.emailAddress;
    this.favoriteRunID = properties.favoriteRunID;
    this.avatarURL = properties.avatarURL;
    this.username = properties.username;
    this.permissionOverrides = properties.permissionOverrides;

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

  static async getFromID(userID: string): Promise<User> {

    const data = await this.fetch(`/users/${userID}`, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    return new User(data);

  }

  static async getFromToken(token: `Bearer ${string}`): Promise<User> {

    const data = await this.fetch(`/user`, {
      headers: {
        "Content-Type": "application/json",
        authorization: token
      }
    });

    return new User(data);

  }

  static async fetch(path: "/users", properties: {method: "POST", body: string, headers: {["Content-Type"]: "application/json"}}): Promise<UserProperties>;
  static async fetch(path: `/users?username=${string}`, properties: {method?: "GET", headers: {["Content-Type"]: "application/json"}}): Promise<UserProperties[]>;
  static async fetch(path: `/users/${string}/runs`, properties: {method?: "GET", headers: {["Content-Type"]: "application/json"}}): Promise<RunProperties[]>;
  static async fetch(path: `/users/${string}`, properties: {method?: "GET", headers: {["Content-Type"]: "application/json"}}): Promise<UserProperties>;
  static async fetch(path: `/users/${string}`, properties: {method: "PATCH", headers: {["Content-Type"]: "application/json", authorization: `Bearer ${string}`}, body: string}): Promise<UserProperties>;
  static async fetch(path: `/user`, properties: {method?: "GET", headers: {["Content-Type"]: "application/json", authorization: `Bearer ${string}`}}): Promise<UserProperties>
  static async fetch(...parameters: Parameters<(typeof Client)["fetch"]>): Promise<UserProperties | UserProperties[] | RunProperties[]> {

    return super.fetch(...parameters);

  }

  getAccessLevel(permission: Permission): number {

    const accessLevel = this.permissionOverrides?.[permission._id];
    if (typeof(accessLevel) === "number") {

      return accessLevel;

    }

    return permission.defaultAccessLevel;

  }

  async createSession(password: string): Promise<Session> {

    return await Session.createSession({
      username: this.username,
      password
    });

  }

  async edit(properties: Partial<Omit<UserProperties, "_id" | "permissionOverrides"> & {permissionOverrides: NewPermissionOverrides}>): Promise<User> {

    if (!User.session?.token) {

      throw new Error("User is unauthenticated.");

    }

    const newProperties = await User.fetch(`/users/${this._id}`, {
      method: "PATCH",
      body: JSON.stringify(properties),
      headers: {
        "Content-Type": "application/json",
        authorization: User.session.token
      }
    });

    const user = new User(newProperties);
    return user;

  }

  async getRuns(): Promise<Run[]> {

    const data = await User.fetch(`/users/${this._id}/runs`, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    const runs = [];

    for (const runObject of data) {

      const run = new Run(runObject);
      runs.push(run);

    }

    return runs;


  }

}
