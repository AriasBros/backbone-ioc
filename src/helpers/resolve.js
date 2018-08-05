import container from "../Container";

/**
 * @public
 * @since
 * @param {string} abstract
 * @returns {*}
 */
function resolve(abstract) {
    return container.resolve(abstract);
}

/**
 * @since
 * @alias resolve
 */
const make = resolve;


export default resolve;
export { make };
