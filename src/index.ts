import { DatabaseManager } from './database/dataBaseManager';
import { MongoDBService } from './database/mongodbConnect';
import ExpressService from './services/expressService';
import WebSocketService from './services/websocketService';
import dotenv from 'dotenv';

dotenv.config

const webSocketService = new WebSocketService();
const expressService = new ExpressService();
const mongoDbService = new MongoDBService(process.env.MONGODB_URI as string);

const dbManager = new DatabaseManager([mongoDbService]);

expressService.start();
webSocketService.start();
dbManager.connectAll();




