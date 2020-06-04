export default class FileDoesNotExistError extends Error {
    constructor(file, directory, isSuppressed) {
        super(`The file ${file} was expected in this directory: ${directory}. ${isSuppressed ? 'This error was suppressed because the file is not required to achieve a successful build.' : ''}`);
    }
}