import { sessions } from '@/utils/session';
import { NextFunction, Request, Response } from 'express';

export const auth = async (req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>> => {
  // if this request doesn't have any cookies, that means it isn't
  // authenticated. Return an error code.
  console.log('quki:', req.cookies);
  const token = (req.headers['X-Access-Token'] || req.headers.authorization)?.toString();
  console.log(token);

  if (!req.cookies) {
    res.status(401).json({ message: 'TOKEN_NOT_FOUND' });
    return;
  }

  // We can obtain the session token from the requests cookies, which come with every request
  const sessionToken = req.cookies['session_token'];
  if (!sessionToken) {
    // If the cookie is not set, return an unauthorized status
    res.status(401).json({ message: 'TOKEN_NOT_FOUND' });
    return;
  }

  // We then get the session of the user from our session map
  // that we set in the signinHandler
  const userSession = sessions[sessionToken];
  if (!userSession) {
    // If the session token is not present in session map, return an unauthorized error
    res.status(401).json({ message: 'TOKEN_INVALID' });
    return;
  }
  // if the session has expired, return an unauthorized error, and delete the
  // session from our map
  if (userSession.isExpired()) {
    delete sessions[sessionToken];
    res.status(401).json({ message: 'TOKEN_EXPIRED' });
    return;
  }

  req.user = userSession;
  return next();
};
