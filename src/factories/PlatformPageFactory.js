import {Factory} from 'tramway-core-connection';
import {PlatformPage} from '../entities';

/**
 * @abstract
 * @export
 * @class PlatformPageFactory
 */
export default class PlatformPageFactory extends Factory {

    /**
     * @param {Object} item
     * @returns {Entity}
     * 
     * @memberOf PlatformPageFactory
     */
    create(item = {}) {
        const {
            id,
            name,
            title,
            html,
            lastModified,
        } = item;

        return new PlatformPage()
            .setId(id)
            .setName(name)
            .setTitle(title)
            .setHtml(html)
            .setLastModified(lastModified)
        ;
    }

}