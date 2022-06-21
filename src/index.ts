import { router } from '@/routes/index';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import session from 'express-session';
import http from 'http';
import { Server } from 'socket.io';
import { v4 as uuid } from 'uuid';
import { Logger, morganMiddleware } from './components/logger/winston';
import { WS } from './components/socket';

const app = express();
const port = 3001;

const options: cors.CorsOptions = {
  // allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "culture"],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: [
    `http://localhost:${port}`,
    `http://localhost:3000`,
    `http://localhost:3001`,
    `http://localhost:3002`,
    `http://35.233.177.7:${port}`,
    'http://35.233.177.7:3001',
    'http://35.233.177.7:3000',
  ],
  preflightContinue: false,
  exposedHeaders: ['set-cookie'],
};

app.set('trust proxy', 1); // trust first proxy
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 60000, expires: new Date(Date.now() + 60 * 60 * 1000) },
    genid: (req: Request) => uuid(),
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(morganMiddleware);
app.use(express.raw());
// app.use(express.raw({ type: "image/*", limit: "5mb" }));
app.use(cors(options));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(`${process.env.PUBLIC_PATH}`));
app.use(fileUpload());
app.use(router);
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

function logErrors(err: Error, req: Request, res: Response, next: NextFunction) {
  Logger.error(err.stack);
  next(err);
}

function clientErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
}

/**
 * Socket connetion
 */
export const server = http.createServer(app);
export const io = new Server(server);

server.listen(port, () => {
  console.log(`Server is running and listening on port http://localhost:${port}`);
  Logger.debug(`Server is up and running @ http://localhost:${port}`);
});

server.on('error', (err) => {
  Logger.error('Server gives an error:', err);
});

try {
  WS();
} catch (error) {
  console.log(error);
}
