export default class Resolver {
    items = new Map();

    add(key, item) {
        this.items.set(key, item);
        return this;
    }

    get(key) {
        return this.items.get(key);
    }
}