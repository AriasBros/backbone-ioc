import container from "../Container";

/**
 * @public
 * @since 1.0.0
 * @param {string} abstract
 * @param {...} [*args]
 * @return {Function}
 */
export default function inject(abstract) {
    return container.inject(abstract);
}
