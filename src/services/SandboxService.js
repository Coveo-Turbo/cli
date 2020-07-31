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

    getPage(path, name) {
        return this.fileProvider.read(`./${path}/${name}.html`);
    }

    getJavascript() {
        return this.fileProvider.read(`./dist/index.min.js`);
    }

    getCss() {
        return this.fileProvider.read(`./dist/css/index.min.css`);
    }
}