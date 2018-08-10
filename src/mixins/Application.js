import _ from "underscore";

/**
 * @public
 * @since 1.0.0
 * @mixin
 * @name Application
 */
export default {
    /**
     * @protected
     * @since 1.0.0
     * @type {Array}
     */
    serviceProviders: [],

    /**
     * @private
     * @since 1.0.0
     * @type {Array}
     */
    serviceProviderInstances: [],

    /**
     * @protected
     * @since 1.0.0
     */
    registerServiceProviders() {
        _.each(this.serviceProviders, provider => {
            const instance = new provider;

            instance.register();
            this.serviceProviderInstances.push(instance);
        });

        _.each(this.serviceProviderInstances, provider => provider.boot());
    }
};