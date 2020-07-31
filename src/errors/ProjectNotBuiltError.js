export default class ProjectNotBuiltError extends Error {
    constructor() {
        super('The project must be built prior to deploying.')
    }
}