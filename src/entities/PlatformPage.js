import {Entity} from 'tramway-core-connection';

export default class PlatformPage extends Entity {
    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
        return this;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
        return this;
    }

    getTitle() {
        return this.title;
    }

    setTitle(title) {
        this.title = title;
        return this;
    }

    getHtml() {
        return this.html;
    }

    setHtml(html) {
        this.html = html;
        return this;
    }

    getLastModified() {
        return this.lastModified;
    }

    setLastModified(lastModified) {
        this.lastModified = lastModified;
        return this;
    }
}