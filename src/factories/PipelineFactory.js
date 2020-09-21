import {Factory} from 'tramway-core-connection';
import {Pipeline} from '../entities';

/**
 * @abstract
 * @export
 * @class PipelineFactory
 */
export default class PipelineFactory extends Factory {

    /**
     * @param {Object} item
     * @returns {Entity}
     * 
     * @memberOf PipelineFactory
     */
    create(item = {}) {
        const {
            id,
            name,
            description,
            condition,
            apiKeysThatCanEdit,
            groupsThatCanEdit,
        } = item;

        return new Pipeline()
            .setId(id)
            .setName(name)
            .setDescription(description)
            .setCondition(condition)
            .setApiKeysThatCanEdit(apiKeysThatCanEdit)
            .setGroupsThatCanEdit(groupsThatCanEdit)
        ;
    }

}