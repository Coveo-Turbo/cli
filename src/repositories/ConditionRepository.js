import {Repository} from 'tramway-core-connection';

export default class ConditionRepository extends Repository {
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

    setQueryString(param, value) {
        this.provider.setQueryString(param, value);
        return this;
    }

    setHeader(key, value) {
        this.provider.setHeader(key, value);
        return this;
    }

    async create(entity) {
        try {
            entity = await super.create(entity);
        } catch(e) {
            throw e;
        }
        
        return this.factory.create(entity);
    }
}