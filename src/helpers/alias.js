import container from "../Container";

/**
 * @public
 * @since
 * @param {string} abstract
 * @param {string} alias
 */
export default function singleton(abstract, alias) {
    container.alias(abstract, alias);
}
