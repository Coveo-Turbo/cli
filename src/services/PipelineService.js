export default class PipelineService {
    constructor(repository) {
        this.repository = repository;
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

    /**
     * @param {String|Number} id
     * @returns {Entity}
     */
    async getOne(id) {
        return await this.repository.getOne(id);
    }

    /**
     * @returns {Collection}
     */
    async get() {
        return await this.repository.get();
    }

    /**
     * @param {Entity} entity
     * @returns
     */
    async create(entity, {orgId, token, verbosity}) {
        this.manageParameters(orgId, token);

        return await this.repository.create(entity);
    }

    /**
     * @param {Entity} entity
     * @returns
     */
    async update(entity) {
        return await this.repository.update(entity);
    }

    /**
     * @param {String|Number} id
     * @returns
     */
    async delete(id) {
        return await this.repository.delete(id);
    }

    /**
     * @param {string | Object} conditions
     * @returns {Collection}
     */
    async find(conditions) {
        return await this.repository.find(conditions);
    }

    /**
     * @param {number[] | stringp[]} ids
     * @returns {Collection}
     */
    async getMany(ids) {
        return await this.repository.getMany(ids);
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