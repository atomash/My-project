import express from 'express';
import favicon from 'serve-favicon';
import ServerRender from './renderServer/serverRender';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import proxy from 'http-proxy-middleware';
import api from './api';
import mongoose, { connectMongo } from  './connectMongo';
import cors from 'cors';


connectMongo('mongodb://localhost:27017/testdbmongo')

const app = express();
const MongoStore = require('connect-mongo')(session);

app.disable('x-powered-by');
app.use(cors());
const webpackDevServerHost = 'localhost:3000';

if (process.env.NODE_ENV === 'development') {
    const __ROOT_DIR__ = process.cwd();
    app.use('/static', proxy({target: `http://${webpackDevServerHost}`, changeOrigin: true}));
    app.use('/antd', express.static(path.resolve(__ROOT_DIR__, 'node_modules', 'antd', 'dist')));
}

if (process.env.NODE_ENV !== 'development') {
    const __ROOT_DIR__ = process.cwd();
    const staticDirPath = path.resolve(__ROOT_DIR__, 'build', 'static')
    ;
    app.use(favicon(path.join(__ROOT_DIR__, 'build', 'favicon.ico')));
    app.use('/static', express.static(staticDirPath));
}


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ 
        mongooseConnection: mongoose.connection 
    }),
    cookie: {
        httpOnly: true, maxAge: 180 * 60 * 1000 
    }
}));


app.use('/api', api);

app.get('*', ServerRender);

if (process.env.NODE_ENV === 'development'){
    app.use(proxy(`ws://${webpackDevServerHost}`, {changeOrigin:true}));
}


export default app;