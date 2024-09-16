// src/database/MongoDBService.ts
import mongoose from 'mongoose';
import { IConnectDatabase } from './IDataBaseConnect';

export class MongoDBService implements IConnectDatabase {
  private uri: string;

  constructor(uri: string) {
    this.uri = uri;
  }

  async connect(): Promise<void> {
    try {
      await mongoose.connect(this.uri, {
       
      });
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  }

  async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log('MongoDB disconnected successfully');
    } catch (error) {
      console.error('MongoDB disconnection error:', error);
    }
  }
}

