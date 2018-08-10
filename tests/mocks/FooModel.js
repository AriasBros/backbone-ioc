import Backbone from "backbone";
import inject from "../../src/helpers/inject";
import resolve from "../../src/helpers/resolve";

const FooModel = Backbone.Model.extend({
    serviceInjected: inject("foo"),

    initialize() {
        this.service = resolve("foo");
    }
});

export default FooModel;