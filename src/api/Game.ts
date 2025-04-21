/**
 * A class that represents a game.
 * 
 * Programmer: Christian Toney (https://github.com/Christian-Toney)
 * © 2025 Swiftplay Group
 */

import { CategoryProperties } from "./Category.ts";
import Client from "./Client.ts";
import Run, { NewRunProperties, RunProperties } from "./Run.ts";
import { UserProperties } from "./User.ts";

export type GameProperties = {
  _id: string;
  name: string;
  coverArtURL?: string;
  publisherName: string;
  approval?: GameApproval;
  categories: CategoryProperties[];
}

export type GameApproval = {
  owner: UserProperties;
  timestamp: Date;
}

export default class Game extends Client {

  _id: GameProperties["_id"];
  name: GameProperties["name"];
  coverArtURL: GameProperties["coverArtURL"];
  publisherName: GameProperties["publisherName"];
  approval: GameProperties["approval"];
  categories: GameProperties["categories"];

  constructor(properties: GameProperties) {

    super();
    this._id = properties._id;
    this.name = properties.name;
    this.publisherName = properties.publisherName;
    this.coverArtURL = properties.coverArtURL;
    this.categories = properties.categories;

  }

  static async fetch(path: `/games/${string}/runs${string | undefined}`, properties: {method: "POST", headers: {"Content-Type": "application/json", authorization: `Bearer ${string}`}, body: string}): Promise<RunProperties>;
  static async fetch(path: `/games/${string}/runs${string | undefined}`, properties: {method?: "GET", headers: {"Content-Type": "application/json"}}): Promise<RunProperties[]>;
  static async fetch(path: `/games/${string}`, properties: {method?: "GET", headers: {"Content-Type": "application/json"}}): Promise<GameProperties>;
  static async fetch(...parameters: Parameters<(typeof Client)["fetch"]>): Promise<GameProperties | RunProperties[] | RunProperties> {

    return super.fetch(...parameters);

  }

  static async getFromID(gameID: string): Promise<Game> {

    const data = await this.fetch(`/games/${gameID}`, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    return new Game(data);

  }

  async getRuns(filter: {includeUnverified?: boolean, unverifiedOnly?: boolean, includeRemoved?: boolean, removedOnly?: boolean} = {}): Promise<Run[]> {

    const params = new URLSearchParams();
    if (filter.includeUnverified) params.append("include_removed", "true");
    if (filter.unverifiedOnly) params.append("unverified_only", "true");
    if (filter.includeRemoved) params.append("include_removed", "true");
    if (filter.removedOnly) params.append("removed_only", "true");
    const searchParams = params.toString();

    const data = await Game.fetch(`/games/${this._id}/runs${searchParams ? `?${searchParams}` : ""}`, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    const games = data.map((data) => new Run(data));

    return games;

  }

  async submitRun(properties: NewRunProperties): Promise<Run> {

    if (!Client.session?.token) {

      throw new Error("User is unauthenticated.");

    }

    const data = await Game.fetch(`/games/${this._id}/runs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: Client.session.token
      },
      body: JSON.stringify(properties)
    });

    return new Run(data);

  }

}
