import Path from 'path';

export default class SandboxService {
    constructor(fileProvider) {
        this.fileProvider = fileProvider;
    }

    create(path) {
        this.copy(path);
    }

    copy(path) {
        this.fileProvider.copy(Path.resolve(__dirname, `../../templates/sandbox/index.html`), `./${path}/index.html`);
    }
}