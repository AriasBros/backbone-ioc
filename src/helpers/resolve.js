import container from "../Container";

/**
 * @public
 * @since
 * @param {string} abstract
 * @param {...} [*args]
 * @returns {*}
 */
function resolve(abstract) {
    return container.resolve.apply(container, arguments);
}

/**
 * @since
 * @alias resolve
 */
const make = resolve;


export default resolve;
export { make };
