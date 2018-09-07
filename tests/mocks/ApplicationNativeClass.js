import _ from "underscore";
import Application from "../../src/mixins/Application";

class ApplicationNativeClass {
    constructor() {
        this.serviceProviders = [

        ];

        this.registerServiceProviders();
    }
}

_.extend(ApplicationNativeClass.prototype, Application);

export default ApplicationNativeClass;