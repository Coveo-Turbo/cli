export default class InvalidLocalizationFileTypeError extends Error {
    constructor(type, types) {
        super(`The type (${type}) is not one of the valid types: ${types.join(', ')}`);
    }
}