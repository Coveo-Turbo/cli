import { pascalCase } from 'change-case';
import NamingStrategy from './NamingStrategy';

export default class PascalCaseNamingStrategy extends NamingStrategy {
    formatName(name) {
        return pascalCase(name);
    }
}