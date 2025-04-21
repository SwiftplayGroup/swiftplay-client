/**
 * A class that represents a category.
 * 
 * Programmer: Christian Toney (https://github.com/Christian-Toney)
 * © 2025 Swiftplay Group
 */

import Client from "./Client.ts";

export type CategoryProperties = {
  _id: string;
  gameID: string;
  name: string;
}

export default class Category extends Client {

  _id: string;
  gameID: string;
  name: string;

  constructor(properties: CategoryProperties) {

    super();
    this._id = properties._id;
    this.gameID = properties.gameID;
    this.name = properties.name;

  }

  static async fetch(...parameters: Parameters<(typeof Client)["fetch"]>): Promise<CategoryProperties> {

    return super.fetch(...parameters);

  }

  async delete(): Promise<void> {

    if (!Client.session?.token) {

      throw new Error("User is not authenticated.");

    }

    await Category.fetch(`/runs/${this.gameID}/categories/${this._id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${Client.session.token}`
      }
    });

  }

}
