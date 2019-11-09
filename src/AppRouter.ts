import express from 'express';

export class AppRouter {
  private static instance: express.Router;
  // this we can modify it to accessors
  static getInstance(): express.Router{
    if(!this.instance){
      AppRouter.instance = express.Router();
    }
    return AppRouter.instance;
  }
}