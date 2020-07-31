export default class PlatformPageStaticResourceService {
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

    setHeader(key, value) {
        this.repository.setHeader(key, value);
        return this;
    }

    /**
     * @param {String|Number} id
     * @returns {Entity}
     */
    async getOne(type, id) {
        this.repository.setQueryParameter('type', type);
        return await this.repository.getOne(id);
    }

    /**
     * @returns {Collection}
     */
    async get(type) {
        this.repository.setQueryParameter('type', type);
        return await this.repository.get();
    }

    /**
     * @param {Entity} entity
     * @returns
     */
    async create(type, entity) {
        this.repository.setQueryParameter('type', type);
        return await this.repository.create(entity);
    }

    /**
     * @param {Entity} entity
     * @returns
     */
    async update(type, entity) {
        this.repository.setQueryParameter('type', type);
        return await this.repository.update(entity);
    }

    /**
     * @param {String|Number} id
     * @returns
     */
    async delete(type, id) {
        this.repository.setQueryParameter('type', type);
        return await this.repository.delete(id);
    }

    /**
     * @param {string | Object} conditions
     * @returns {Collection}
     */
    async find(type, conditions) {
        this.repository.setQueryParameter('type', type);
        return await this.repository.find(conditions);
    }

    /**
     * @param {number[] | stringp[]} ids
     * @returns {Collection}
     */
    async getMany(type, ids) {
        this.repository.setQueryParameter('type', type);
        return await this.repository.getMany(ids);
    }
}