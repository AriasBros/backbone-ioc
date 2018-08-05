import container from "../Container";

/**
 * @public
 * @since
 * @param {string} abstract
 * @param {Object|function} concrete
 */
export default function singleton(abstract, concrete) {
    container.singleton(abstract, concrete);
}
