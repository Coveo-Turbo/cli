import {Entity} from 'tramway-core-connection';

export default class PlatformPageStaticResource extends Entity {
    getId() {
        return this.name;
    }

    setId(id) {
        this.name = id;
        return this;
    }

    getInlineContent() {
        return this.inlineContent;
    }

    setInlineContent(inlineContent) {
        this.inlineContent = inlineContent;
        return this;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
        return this;
    }

    getUrl() {
        return this.url;
    }

    setUrl(url) {
        this.url = url;
        return this;
    }
}