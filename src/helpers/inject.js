import _ from "underscore";
import container from "../Container";

/**
 * @public
 * @since
 * @param {string} abstract
 * @returns {function}
 */
export default function inject(abstract) {
    return _.once(function() {
        return container.resolve(abstract);
    });
}
