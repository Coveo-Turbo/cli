import { paramCase } from 'change-case';
import NamingStrategy from './NamingStrategy';

export default class ParamCaseNamingStrategy extends NamingStrategy {
    formatName(name) {
        return paramCase(name);
    }
}