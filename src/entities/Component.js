export default class Component {
    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
        return this;
    }

    getCode() {
        return this.code;
    }

    setCode(code) {
        this.code = code;
        return this;
    }

    getExtension() {
        return this.extension;
    }

    setExtension(extension) {
        this.extension = extension;
        return this;
    }
}