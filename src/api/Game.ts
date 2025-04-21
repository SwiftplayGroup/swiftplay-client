/**
 * A class that represents a game.
 * 
 * Programmer: Christian Toney (https://github.com/Christian-Toney)
 * © 2025 Swiftplay Group
 */

import Category, { CategoryProperties } from "./Category.ts";
import Client from "./Client.ts";
import Run, { NewRunProperties, RunProperties } from "./Run.ts";
import { UserProperties } from "./User.ts";

export type GameProperties = {
  _id: string;
  name: string;
  coverArtURL?: string;
  publisherName: string;
  approval?: GameApproval;
  categories: Category[];
}

export type GameApproval = {
  owner: UserProperties;
  timestamp: Date;
}

type OrNull<T> = {
  [P in keyof T]?: T[P] | null;
};

export type EditableGameProperties = OrNull<Omit<GameProperties, "_id" | "approval"> & {
  approval: {
    ownerID: string;
  } | null
}>

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
    this.approval = properties.approval;

  }

  static async fetch(path: `/games/${string}/categories`, properties: {method: "POST", headers: {"Content-Type": "application/json", authorization: `Bearer ${string}`}, body: string}): Promise<CategoryProperties>;
  static async fetch(path: `/games/${string}/runs${string | undefined}`, properties: {method: "POST", headers: {"Content-Type": "application/json", authorization: `Bearer ${string}`}, body: string}): Promise<RunProperties>;
  static async fetch(path: `/games/${string}/runs${string | undefined}`, properties: {method?: "GET", headers: {"Content-Type": "application/json"}}): Promise<RunProperties[]>;
  static async fetch(path: `/games/${string}`, properties: {method: "PATCH", headers: {"Content-Type": "application/json", authorization: `Bearer ${string}`}, body: string}): Promise<GameProperties>;
  static async fetch(path: `/games/${string}`, properties: {method: "DELETE", headers: {authorization: `Bearer ${string}`}}): Promise<void>;
  static async fetch(path: `/games/${string}`, properties: {method?: "GET", headers: {"Content-Type": "application/json"}}): Promise<GameProperties>;
  static async fetch(...parameters: Parameters<(typeof Client)["fetch"]>): Promise<GameProperties | RunProperties[] | RunProperties | CategoryProperties | void> {

    return super.fetch(...parameters);

  }

  static async getFromID(gameID: string): Promise<Game> {

    const data = await this.fetch(`/games/${gameID}`, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    const categories = [];
    for (const categoryData of data.categories) {

      const category = new Category(categoryData);
      categories.push(category);

    }

    return new Game({...data, categories});

  }

  async approve(): Promise<Game> {
  
    if (!Client.session?.token) {

      throw new Error("User is not authenticated.");

    }

    return await this.edit({
      approval: {
        ownerID: (await Client.session.getUser())._id
      }
    });

  }

  async createRunCategory(properties: Omit<CategoryProperties, "_id" | "gameID">): Promise<Category> {

    if (!Client.session?.token) {

      throw new Error("User is unauthenticated.");

    }

    const data = await Game.fetch(`/games/${this._id}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Client.session.token}`
      },
      body: JSON.stringify(properties)
    });

    return new Category(data);

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
        authorization: `Bearer ${Client.session.token}`
      },
      body: JSON.stringify(properties)
    });

    return new Run(data);

  }

  async delete(): Promise<void> {
  
    if (!Client.session?.token) {

      throw new Error("User is not authenticated.");

    }

    await Game.fetch(`/games/${this._id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${Client.session.token}`
      }
    });

  }

  async edit(properties: EditableGameProperties): Promise<Game> {
  
    if (!Client.session?.token) {

      throw new Error("User is not authenticated.");

    }

    const editedGameData = await Game.fetch(`/games/${this._id}`, {
      method: "PATCH",
      body: JSON.stringify(properties),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Client.session.token}`
      }
    });

    return new Game(editedGameData);

  }

  async unapprove(): Promise<Game> {

    return await this.edit({
      approval: null
    });

  }

}
