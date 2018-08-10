import _ from "underscore";
import Backbone from "backbone";

/**
 * @public
 * @since 1.0.0
 * @mixes Backbone.Events
 */
class Container {
    constructor() {
        this.bindings = {};
        this.resolved = {};
        this.aliases = {};

        Object.assign(this, Backbone.Events);

        delete this.bind;
        delete this.unbind;
    }

    /**
     * @public
     * @since 1.0.0
     * @param {string} abstract
     * @param {function|Object} concrete
     * @param {boolean} [shared=false]
     */
    bind(abstract, concrete, shared) {
        if (!_.isFunction(concrete)) {
            shared = true;
        }

        this.bindings[abstract] = {
            concrete: concrete,
            shared: shared
        };

        this.trigger("bind", abstract, concrete, shared);
        this.trigger("bind." + abstract, concrete, shared);
    }

    /**
     * @public
     * @since 1.0.0
     * @param {string} abstract
     */
    unbind(abstract) {
        delete this.bindings[abstract];
        delete this.resolved[abstract];

        _.each(this.aliases, (abs, alias) => {
            if (abs === abstract) {
                delete this.aliases[alias];
            }
        });
    }

    /**
     * @public
     * @since 1.0.0
     * @param {string} abstract
     * @param {function|Object} concrete
     */
    singleton(abstract, concrete) {
        this.bind(abstract, concrete, true);
    }

    /**
     * @public
     * @since 1.0.0
     * @param {string} abstract
     * @param {string} alias
     */
    alias(abstract, alias) {
        this.aliases[alias] = abstract;
        this.trigger("aliased", abstract, alias);
        this.trigger("aliased." + abstract, alias);
    }

    /**
     * @public
     * @since 1.0.0
     * @param {string} abstract
     * @param {...} [*args]
     * @return {Function}
     */
    inject(abstract) {
        return () => {
            return this.resolve(abstract);
        };
    }

    /**
     * @public
     * @since 1.0.0
     * @param {string} abstract
     * @param {...} [*args]
     * @return {Object}
     */
    resolve(abstract) {
        let binding = this.binding(abstract);
        let instance = null;

        abstract = binding[1];
        binding = binding[0];

        if (binding) {
            if (binding.shared === true) {
                instance = this.resolved[abstract];
            }

            if (!instance) {
                const concrete = binding.concrete;

                if (_.isFunction(concrete)) {
                    instance = new (Function.prototype.bind.apply(concrete, arguments));
                } else {
                    instance = concrete;
                }

                if (binding.shared === true) {
                    this.resolved[abstract] = instance;
                }

                this.trigger("resolved", abstract, instance, concrete);
                this.trigger("resolved." + abstract, instance, concrete);
            }
        }

        return instance;
    }

    /**
     * @public
     * @since 1.0.0
     * @alias resolve
     */
    make() {
        return this.resolve.apply(this, arguments);
    }

    /**
     * @private
     * @since 1.0.0
     * @param {string} abstract
     * @return {Array}
     */
    binding(abstract) {
        let binding = null;

        if (abstract) {
            binding = this.bindings[abstract];

            if (!binding) {
                binding = this.binding(this.aliases[abstract]);

                abstract = binding[1];
                binding = binding[0];
            }
        }

        return [binding, abstract];
    }
}

export default new Container;
export { Container };