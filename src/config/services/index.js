import router from './router';
import logger from './logger';
import core from './core';
import controllers from './controllers';
import services from './services';
import commands from './commands';
import providers from './providers';
import factories from './factories';
import resolvers from './resolvers';

export default {
    ...router,
    ...logger,
    ...core,
    ...controllers,
    ...services,
    ...commands,
    ...providers,
    ...factories,
    ...resolvers,
}