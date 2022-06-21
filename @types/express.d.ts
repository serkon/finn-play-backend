import 'express';

declare module 'express' {
  export interface Request {
    user?: User;
    session?: Session;
  }
}
