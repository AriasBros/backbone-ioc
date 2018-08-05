import _ from "underscore";
import Backbone from "backbone";

class Container {
    constructor() {
        this.bindings = {};
        this.resolved = {};
        this.aliases = {};

        Object.assign(this, Backbone.Events);
        delete this.bind;
    }

    /**
     * @public
     * @since
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
     * @since
     * @param {string} abstract
     * @param {function|Object} concrete
     */
    singleton(abstract, concrete) {
        this.bind(abstract, concrete, true);
    }

    /**
     * @public
     * @since
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
     * @since
     * @param abstract
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
                instance = _.isFunction(binding.concrete) ? new binding.concrete : binding.concrete;

                if (binding.shared === true) {
                    this.resolved[abstract] = instance;
                }

                this.trigger("resolved", abstract, instance, binding.concrete);
                this.trigger("resolved." + abstract, instance, binding.concrete);
            }
        }

        return instance;
    }

    /**
     * @public
     * @since
     * @alias resolve
     */
    make() {
        return this.resolve.apply(this, arguments);
    }

    /**
     * @private
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

const container = new Container;

export default container;
export { Container };