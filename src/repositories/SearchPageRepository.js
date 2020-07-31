import {Repository} from 'tramway-core-connection';

export default class SearchPageRepository extends Repository {
    constructor(provider, factory) {
        super(provider, factory);
    }

    setParam(param, value) {
        this.provider.setParam(param, value);
        return this;
    }

    setQueryParameter(param, value) {
        this.provider.setQueryParameter(param, value);
        return this;
    }

    setHeader(key, value) {
        this.provider.setHeader(key, value);
        return this;
    }

    async register(pageName) {
        return await this.provider.update(pageName);
    }
}