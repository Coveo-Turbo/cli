export default class ConditionService {
    constructor(repository, factory) {
        this.repository = repository;
        this.factory = factory;
    }

    setParam(param, value) {
        this.repository.setParam(param, value);
        return this;
    }

    setQueryParameter(param, value) {
        this.repository.setQueryParameter(param, value);
        return this;
    }

    setQueryString(param, value) {
        this.repository.setQueryString(param, value);
        return this;
    }

    setHeader(key, value) {
        this.repository.setHeader(key, value);
        return this;
    }

    async create(entity, {orgId, token, verbosity}) {
        this.manageParameters(orgId, token);

        return await this.repository.create(entity);
    }

    async createSearchHub(searchHub, {orgId, token, verbosity}) {
        let entity = this.factory.createSearchHub(searchHub);
        return await this.create(entity, {orgId, token, verbosity});
    }

    manageParameters(orgId, token) {
        if (orgId) {
            this.setQueryString('organizationId', orgId);
        }

        if (token) {
            this.setHeader('authorization', `Bearer ${token}`);
        }
    }
}