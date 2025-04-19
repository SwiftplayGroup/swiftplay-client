/**
 * A class that represents a Swiftplay client.
 * 
 * Programmer: Christian Toney (https://github.com/Christian-Toney)
 * © 2025 Swiftplay Group
 */

import UnknownError from "./errors/UnknownError.ts";
import HTTPError from "./errors/HTTPError.ts";
import User from "./User.ts";

export default abstract class Client {

  static apiURI = process.env.NEXT_PUBLIC_API_URI_OVERRIDE ?? "https://swiftplay.onrender.com"; // TODO: Set this automatically based on environment variables.
  static token?: string;
  static userID?: string;
  static authenticatedUser?: User;

  constructor() {



  }

  static async fetch(path: string, properties: RequestInit): Promise<any> {

    const response = await fetch(`${this.apiURI}${path}`, properties);
    
    if (response.ok) {

      return await response.json();

    }

    try {

      const { message } = await response.json();
      throw new HTTPError(response.status, message);

    } catch (error) {

      if (error instanceof HTTPError) {

        throw error;

      } else {

        console.error(response);
        console.error(error);
        throw new UnknownError();

      }
      
    }

  }

}