export default class SandboxDoesNotExistError extends Error {
    constructor(name) {
        super(`The following sandbox does not exist: ${name}`);
    }
}