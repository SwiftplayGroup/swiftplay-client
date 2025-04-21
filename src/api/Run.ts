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

export type RunProperties = {
  _id: string;
  durationMilliseconds: number;
  youtubeWatchID: string;
  category?: Category;
  owner: UserProperties;
  game: GameProperties;
};

export default class Run extends Client {
  _id: string;
  category?: Category;
  durationMilliseconds: number;
  youtubeWatchID: string;
  game: Game;
  owner: User;

  constructor(properties: RunProperties) {
    super();
    this._id = properties._id;
    this.durationMilliseconds = properties.durationMilliseconds;
    this.youtubeWatchID = properties.youtubeWatchID;
    this.category = properties.category;
    this.game = new Game(properties.game);
    this.owner = new User(properties.owner);
  }

  static async getFromID(runID: string): Promise<Run> {
    const data = await this.fetch(`/runs/${runID}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return new Run(data);
  }

  static async fetch(
    path: `/runs/${string}`,
    properties: {
      method?: "GET";
      headers: { ["Content-Type"]: "application/json" };
    },
  ): Promise<Run>;
  static async fetch(
    ...parameters: Parameters<(typeof Client)["fetch"]>
  ): Promise<RunProperties> {
    return super.fetch(...parameters);
  }
}
