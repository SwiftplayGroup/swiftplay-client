/**
 * A class that represents a run.
 * 
 * Programmer: Christian Toney (https://github.com/Christian-Toney)
 * © 2025 Swiftplay Group
 */

import Category from "./Category.ts";
import Client from "./Client.ts";
import Game, { GameProperties } from "./Game.ts";
import User, { UserProperties } from "./User.ts";

export type Verification = {
  owner: UserProperties;
}

export type RunProperties = {
  _id: string;
  durationMilliseconds: number;
  youtubeWatchID: string;
  category?: Category;
  owner: UserProperties;
  game: GameProperties;
  verification?: Verification;
}

export default class Run extends Client {

  _id: string;
  category?: Category;
  durationMilliseconds: number;
  youtubeWatchID: string;
  game: Game;
  owner: User;
  verification: RunProperties["verification"];

  constructor(properties: RunProperties) {

    super();
    this._id = properties._id;
    this.durationMilliseconds = properties.durationMilliseconds;
    this.youtubeWatchID = properties.youtubeWatchID;
    this.category = properties.category;
    this.game = new Game(properties.game);
    this.owner = new User(properties.owner);
    this.verification = properties.verification;

  }

  static async getFromID(runID: string): Promise<Run> {

    const data = await this.fetch(`/runs/${runID}`, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    return new Run(data);

  }

  static async fetch(path: `/runs/${string}`, properties: {method?: "GET", headers: {"Content-Type": "application/json"}}): Promise<RunProperties>
  static async fetch(path: `/runs/${string}`, properties: {method: "DELETE", headers: {token: string, "user-id": string}}): Promise<void>
  static async fetch(path: `/runs/${string}/verification`, properties: {method: "POST", headers: {"Content-Type": "application/json", token: string, "user-id": string}}): Promise<Verification>
  static async fetch(...parameters: Parameters<(typeof Client)["fetch"]>): Promise<RunProperties | Verification | void> {

    return super.fetch(...parameters);

  }

  async delete(): Promise<void> {

    if (!Run.authenticatedUser || !Run.token) {

      throw new Error("User is not authenticated.");

    }

    await Run.fetch(`/runs/${this._id}`, {
      method: "DELETE",
      headers: {
        "user-id": Run.authenticatedUser?._id,
        "token": Run.token
      }
    });

  }

  async verify(): Promise<Verification> {

    if (!Run.authenticatedUser || !Run.token) {

      throw new Error("User is not authenticated.");

    }

    return await Run.fetch(`/runs/${this._id}/verification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user-id": Run.authenticatedUser?._id,
        "token": Run.token
      }
    });

  }

}
