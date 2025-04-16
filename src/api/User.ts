/**
 * A class that represents a user.
 * 
 * Programmer: Christian Toney (https://github.com/Christian-Toney)
 * © 2025 Swiftplay Group
 */

import Client from "./Client.ts";

export type UserProperties = {
  _id: string;
  emailAddress?: string;
  username: string;
}

export type NewUserProperties = Omit<UserProperties, "_id"> & {
  password: string;
  emailAddress: string;
}

export default class User extends Client {

  _id: string;

  constructor(properties: UserProperties) {

    super();
    this._id = properties._id;

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

  static async fetch(path: "/users", properties: {method: "POST", body: string, headers: {["Content-Type"]: "application/json"}}): Promise<UserProperties>;
  static async fetch(...parameters: Parameters<(typeof Client)["fetch"]>): Promise<UserProperties> {

    return super.fetch(...parameters);

  }

}
