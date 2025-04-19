/**
 * A class that represents a permission.
 * 
 * Programmer: Christian Toney (https://github.com/Christian-Toney)
 * © 2025 Swiftplay Group
 */

import Client from "./Client.ts";

export enum PermissionAccessLevel {
  DENIED,
  USER,
  ADMIN
}

export type PermissionProperties = {
  _id: string;
  name: string;
  description: string;
  defaultAccessLevel: number;
  hierarchicalName: string;
}

export default class Permission extends Client {

  _id: string;
  name: string;
  description: string;
  defaultAccessLevel: PermissionAccessLevel;
  hierarchicalName: PermissionProperties["hierarchicalName"];
  static defaultPermissions?: Permission[];

  constructor(properties: PermissionProperties) {

    super();
    this._id = properties._id;
    this.description = properties.description;
    this.defaultAccessLevel = properties.defaultAccessLevel;
    this.hierarchicalName = properties.hierarchicalName;
    this.name = properties.name;

  }

  static async find(): Promise<Permission[]> {

    const permissions = this.defaultPermissions ?? [];

    if (!this.defaultPermissions) {

      const data = await this.fetch("/permissions", {
        headers: {
          "Content-Type": "application/json"
        }
      });

      for (const permissionData of data) {

        const permission = new Permission(permissionData);
        permissions.push(permission);

      }

      this.defaultPermissions = permissions;

    }

    return permissions;

  }

  static async fetch(path: "/permissions", properties: {method?: "GET", headers: {["Content-Type"]: "application/json"}}): Promise<PermissionProperties[]>
  static async fetch(...parameters: Parameters<(typeof Client)["fetch"]>): Promise<PermissionProperties | PermissionProperties[]> {

    return super.fetch(...parameters);

  }

}
