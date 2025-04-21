/**
 * A class that represents a game.
 * 
 * Programmer: Christian Toney (https://github.com/Christian-Toney)
 * © 2025 Swiftplay Group
 */

import Client from "./Client.ts";
import { UserProperties } from "./User.ts";

export type GameProperties = {
  _id: string;
  name: string;
  coverArtURL?: string;
  publisherName: string;
  approval?: GameApproval;
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

  constructor(properties: GameProperties) {

    super();
    this._id = properties._id;
    this.name = properties.name;
    this.publisherName = properties.publisherName;
    this.coverArtURL = properties.coverArtURL;

  }

  static async fetch(...parameters: Parameters<(typeof Client)["fetch"]>): Promise<GameProperties> {

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

}
