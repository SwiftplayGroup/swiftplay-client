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
  time: number;
  category?: Category;
  owner: UserProperties;
  game: GameProperties;
}

export default class Run extends Client {

  _id: string;
  category?: Category;
  time: number;
  game: Game;
  owner: User;

  constructor(properties: RunProperties) {

    super();
    this._id = properties._id;
    this.time = properties.time;
    this.category = properties.category;
    this.game = new Game(properties.game);
    this.owner = new User(properties.owner);

  }

  static async fetch(...parameters: Parameters<(typeof Client)["fetch"]>): Promise<RunProperties> {

    return super.fetch(...parameters);

  }

}
