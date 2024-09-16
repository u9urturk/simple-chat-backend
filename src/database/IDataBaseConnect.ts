export interface IConnectDatabase {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
  }
  