export default class InvalidInitializationStrategyError extends Error {
    constructor(type, supportedTypes = []) {
        super(`Invalid initialization strategy passed: ${type} ${supportedTypes.length ? `Supported types are: ${supportedTypes.join(', ')}` : ''}`)
    }
}