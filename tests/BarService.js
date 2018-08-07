export default class BarService {
    constructor(required_param, optional_param) {
        if (required_param === undefined) {
            throw "Required param";
        }

        this.required = required_param;
        this.optional = optional_param;
    }

    foo() {
    }
};