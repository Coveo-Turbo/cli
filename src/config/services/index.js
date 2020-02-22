import router from './router';
import logger from './logger';
import core from './core';
import controllers from './controllers';
import services from './services';
import commands from './commands';

export default {
    ...router,
    ...logger,
    ...core,
    ...controllers,
    ...services,
    ...commands,
}