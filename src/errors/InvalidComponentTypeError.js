export default class InvalidComponentType extends Error {
    constructor(type, supportedTypes = []) {
        super(`Invalid type passed: ${type} ${supportedTypes.length ? `Supported types are: ${supportedTypes.join(', ')}` : ''}`)
    }
}