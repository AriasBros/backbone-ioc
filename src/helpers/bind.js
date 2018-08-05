import container from "../Container";

/**
 * @public
 * @since
 * @param {string} abstract
 * @param {Object|function} concrete
 * @param {boolean} [shared=false]
 */
export default function bind(abstract, concrete, shared) {
    container.bind(abstract, concrete, shared);
}
