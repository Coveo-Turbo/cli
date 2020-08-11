export default class RequiresLocalesError extends Error {
    constructor() {
        super(`Locales are required to perform this operation.`)
    }
}