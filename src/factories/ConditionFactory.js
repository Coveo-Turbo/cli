import {Factory} from 'tramway-core-connection';
import {Condition} from '../entities';

/**
 * @abstract
 * @export
 * @class ConditionFactory
 */
export default class ConditionFactory extends Factory {

    /**
     * @param {Object} item
     * @returns {Entity}
     * 
     * @memberOf ConditionFactory
     */
    create(item = {}) {
        const {
            id,
            definition
        } = item;

        return new Condition()
            .setId(id)
            .setDefinition(definition)
        ;
    }

    createSearchHub(searchHub) {
        return this.create({definition: `when $searchHub is "${searchHub}"`});
    }

}