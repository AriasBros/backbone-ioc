import container from "../Container";

/**
 * @public
 * @since
 * @param {string} abstract
 */
export default function unbind(abstract) {
    container.unbind(abstract);
}
