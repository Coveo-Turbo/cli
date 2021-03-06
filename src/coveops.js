import './env';
import {DependencyResolver, dependencies} from 'tramway-core-dependency-injector';
import * as parameters from './config/parameters';
import services from './config/services';

const {ParametersManager, ServicesManager} = dependencies;
DependencyResolver.create(new ServicesManager(), new ParametersManager()).initialize(services, parameters);

DependencyResolver.getService('command').run();
