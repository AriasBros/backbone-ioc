import container from "./Container";

/**
 * @abstract
 * @public
 * @since 1.0.0
 */
export default class Provider {
    constructor() {
        this.app = container;
    }

    /**
     * @abstract
     * @public
     * @since 1.0.0
     */
    register() {
    }

    /**
     * @abstract
     * @public
     * @since 1.0.0
     */
    boot() {
    }
}
