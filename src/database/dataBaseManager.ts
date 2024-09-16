// src/database/DatabaseManager.ts

import { IConnectDatabase } from "./IDataBaseConnect";

export class DatabaseManager {
  private services: IConnectDatabase[];

  constructor(services: IConnectDatabase[]) {
    this.services = services;
  }

  async connectAll(): Promise<void> {
    for (const service of this.services) {
      await service.connect();
    }
  }

  async disconnectAll(): Promise<void> {
    for (const service of this.services) {
      await service.disconnect();
    }
  }
}
