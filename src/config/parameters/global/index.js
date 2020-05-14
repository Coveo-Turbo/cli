import winston from './winston';
import app from './app';
import cors from './cors';
import port from './port';
import cookieParser from './cookieParser';
import bodyParser from './bodyParser';
import methodOverrides from './methodOverrides';
import routes from './routes';
import commands from './commands';
import searchPageCompiler from './searchPageCompiler';
import component from './component'

export default {
    ...winston,
    app,
    cors,
    port,
    cookieParser,
    ...bodyParser,
    ...methodOverrides,
    routes,
    commands,
    searchPageCompiler,
    component,
}