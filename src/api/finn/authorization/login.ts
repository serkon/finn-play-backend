import users from '@/data/user.json';
import { Session, sessions } from '@/utils/session';
import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

export const findUser = (username: string, password: string) => users.find((item) => item.username === username && password === item.password);

export const Login = async (req: Request, res: Response) => {
  // get users credentials from the JSON body
  const { email, password } = req.body.data;
  console.log('deneme: ', req.body);
  if (!email) {
    // If the username isn't present, return an HTTP unauthorized code
    res.status(401).json({ message: 'email not found' });
    return;
  }

  // validate the password against our data
  // if invalid, send an unauthorized code
  const user = findUser(email, password);
  if (!user) {
    res.status(401).json({ message: 'user not found' });
    return;
  }

  // generate a random UUID as the session token
  const sessionToken = uuid();

  // set the expiry time as 120s after the current time
  const now = new Date();
  const expiresAt = new Date(+now + 120 * 1000);

  // create a session containing information about the user and expiry time
  const session = new Session(email, expiresAt);
  // add the session information to the sessions map
  sessions[sessionToken] = session;

  // In the response, set a cookie on the client with the name "session_cookie"
  // and the value as the UUID we generated. We also set the expiry time
  res.cookie('session_token', sessionToken, { expires: expiresAt });
  res.status(200).json({ data: true });
};
