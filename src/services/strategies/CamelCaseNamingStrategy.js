import { camelCase } from 'change-case';
import NamingStrategy from './NamingStrategy';

export default class CamelCaseNamingStrategy extends NamingStrategy {
    formatName(name) {
        return camelCase(name);
    }
}