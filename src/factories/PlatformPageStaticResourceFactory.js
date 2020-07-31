import {Factory} from 'tramway-core-connection';
import {PlatformPageStaticResource} from '../entities';

/**
 * @abstract
 * @export
 * @class PlatformPageStaticResourceFactory
 */
export default class PlatformPageStaticResourceFactory extends Factory {

    /**
     * @param {Object} item
     * @returns {Entity}
     * 
     * @memberOf PlatformPageStaticResourceFactory
     */
    create(item = {}) {
        const {
            id,
            inlineContent,
            name,
            url,
        } = item;

        return new PlatformPageStaticResource()
            .setId(id || name)
            .setInlineContent(inlineContent)
            .setName(name)
            .setUrl(url)
        ;
    }

}