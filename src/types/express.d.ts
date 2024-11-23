import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export interface GraphQLContext {
  user?: {
    _id: string;
    role: string;
    isAdmin: boolean;
  };
}
