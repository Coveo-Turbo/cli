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

    getPages(path) {
        return this.fileProvider.readDirectory(`./${path}`).map(page => page.replace(/\.\w*$/, ''));
    }

    getPage(path, name) {
        return this.fileProvider.read(`./${path}/${name}.html`);
    }

    savePage(path, name, contents) {
        this.fileProvider.write(path, name, contents, 'html');
    }

    getJavascript() {
        return this.fileProvider.read(`./dist/index.min.js`);
    }

    getCss() {
        return this.fileProvider.read(`./dist/css/index.min.css`);
    }
}