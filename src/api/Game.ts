/**
 * A class that represents a game.
 * 
 * Programmer: Christian Toney (https://github.com/Christian-Toney)
 * © 2025 Swiftplay Group
 */

import Client from "./Client.ts";

export type GameProperties = {
  _id: string;
  name: string;
}

export default class Game extends Client {

  _id: string;
  name: string;

  constructor(properties: GameProperties) {

    super();
    this._id = properties._id;
    this.name = properties.name;

  }

  static async fetch(...parameters: Parameters<(typeof Client)["fetch"]>): Promise<GameProperties> {

    return super.fetch(...parameters);

  }

}
