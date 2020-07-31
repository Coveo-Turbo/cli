import {Factory} from 'tramway-core-connection';
import {SearchPage} from '../entities';

/**
 * @abstract
 * @export
 * @class SearchPageFactory
 */
export default class SearchPageFactory extends Factory {

    /**
     * @param {Object} item
     * @returns {Entity}
     * 
     * @memberOf SearchPageFactory
     */
    create(item) {
        // @TODO: Update entity to ensure data in passed item is used
        return new SearchPage();
    }

}