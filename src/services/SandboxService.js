import Path from 'path';

export default class SandboxService {
    constructor(fileProvider) {
        this.fileProvider = fileProvider;
    }

    create(path, name) {
        this.copy(path, name);
    }

    copy(path, name) {
        this.fileProvider.copy(Path.resolve(__dirname, `../../templates/sandbox/index.html`), `./${path}/${name}.html`);
    }
}