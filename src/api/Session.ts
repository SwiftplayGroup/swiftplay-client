/**
 * A class that represents a session.
 * 
 * Programmer: Christian Toney (https://github.com/Christian-Toney)
 * © 2025 Swiftplay Group
 */

import Client from "./Client.ts";
import User from "./User.ts";

export type SessionProperties = {
  _id: string;
  userID?: string;
  expirationDate?: Date;
  creationIP?: string;
  token?: string;
}

export default class Session extends Client {

  _id: string;
  userID: SessionProperties["userID"];
  expirationDate: SessionProperties["expirationDate"];
  creationIP: SessionProperties["creationIP"];
  token: SessionProperties["token"];
  user?: User;

  constructor(properties: SessionProperties) {

    super();
    this._id = properties._id;
    this.userID = properties.userID;
    this.expirationDate = properties.expirationDate;
    this.creationIP = properties.creationIP;
    this.token = properties.token;

  }

  static async createSession(properties: {username: string, password: string}): Promise<Session> {

    const data = await this.fetch("/user/sessions", {
      method: "POST",
      body: JSON.stringify(properties),
      headers: {
        "Content-Type": "application/json"
      }
    })

    return new Session({
      ...data,
      token: data.token
    });

  }

  static async fetch(path: `/user/sessions/${string}`, properties: {method: "DELETE", headers: {"authorization": string}}): Promise<void>;
  static async fetch(path: "/user/sessions", properties: {method: "POST", body: string, headers: {["Content-Type"]: "application/json"}}): Promise<SessionProperties>;
  static async fetch(...parameters: Parameters<(typeof Client)["fetch"]>): Promise<SessionProperties | void> {

    return await super.fetch(...parameters);

  }

  async delete(): Promise<void> {

    if (!Session?.session?.token) {

      throw new Error("User is unauthenticated.");

    }

    await Session.fetch(`/user/sessions/${this._id}`, {
      method: "DELETE",
      headers: {
        authorization: Session.session.token
      }
    });

  }

  async getUser(): Promise<User> {

    if (!this.user) {

      if (!Client.session?.token) {

        throw new Error("User is unauthenticated.");

      }

      this.user = await User.getFromToken(Client.session.token);

    }

    return this.user;

  }

}
