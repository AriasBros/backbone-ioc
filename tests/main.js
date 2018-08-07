require('should');

import container from "../src/Container";
import alias from "../src/helpers/alias";
import bind from "../src/helpers/bind";
import resolve from "../src/helpers/resolve";
import singleton from "../src/helpers/singleton";
import BarService from "./BarService";
import FooModel from "./FooModel";
import FooService from "./FooService";

describe('Container', function() {
    before(function() {
        bind("bar", BarService);
        bind("foo-bind", FooService);

        singleton("foo-singleton", FooService);
        singleton("foo", FooService);

        alias("foo", "foo-alias");
        alias("foo-alias", "foo-alias-of-alias");
    });

    describe('.bind()', function() {
        /**
         * Probamos que, si registramos una clase con 'bind', el container nos devuelva una instancia de la misma.
         */
        it('should register an abstract with a concrete class', function() {
            const service = resolve("foo-bind");
            service.should.have.property("bar").which.is.a.Function();
        });

        /**
         * Probamos que, si registramos una clase con 'bind', el container nos devuelva una instancia diferente cada vez.
         */
        it("should return different instances", function() {
            const service_1 = resolve("foo-bind");
            const service_2 = resolve("foo-bind");

            service_1.should.have.property("bar").which.is.a.Function();
            service_2.should.have.property("bar").which.is.a.Function();

            service_1.should.not.be.equal(service_2);
        });

        /**
         * Probamos que, si registramos una instancia con 'bind', el container nos devuelva siempre esa misma instancia.
         */
        it("should register an abstract with a concrete instance", function() {
            var service = new FooService;

            bind("bind-concrete-instance", service);

            const service_1 = resolve("bind-concrete-instance");
            const service_2 = resolve("bind-concrete-instance");

            service.should.have.property("bar").which.is.a.Function();
            service_1.should.have.property("bar").which.is.a.Function();
            service_2.should.have.property("bar").which.is.a.Function();

            service.should.be.equal(service_1);
            service.should.be.equal(service_2);
            service_1.should.be.equal(service_2);
        });
    });

    describe(".singleton()", function() {
        /**
         * Probamos que, si registramos una clase con 'singleton', el container nos devuelva una instancia de la misma.
         */
        it('should register an abstract with a concrete class', function() {
            const service = resolve("foo-singleton");
            service.should.have.property("bar").which.is.a.Function();
        });

        /**
         * Probamos que, si registramos una clase con 'singleton', el container nos devuelva siempre la misma instancia.
         */
        it("should return same instances always", function() {
            const service_1 = resolve("foo-singleton");
            const service_2 = resolve("foo-singleton");

            service_1.should.have.property("bar").which.is.a.Function();
            service_2.should.have.property("bar").which.is.a.Function();

            service_1.should.be.equal(service_2);
        });
    });

    describe(".resolve()", function() {
        /**
         * Probamos que 'resolve' devuelve null cuando no existe una implementación para una abstracción.
         */
        it("should return 'null' when a concrete doesn't exist for an abstract", function() {
            const service = resolve("not-found");
            should(service).be.null();
        });

        /**
         * Probamos que 'resolve' devuelve null cuando no existe una implementación para un alias.
         */
        it("should return 'null' when a concrete doesn't exist for an alias", function() {
            const service = resolve("not-found-alias");
            should(service).be.null();
        });

        it("should return initialized concrete with required params", function() {
            const service = resolve("bar", 1);

            service.should.have.property("foo").which.is.a.Function();
            service.should.have.property("required").which.is.equal(1);
            service.should.have.property("optional").which.is.undefined();
        });

        it("should return initialized concrete with all params", function() {
            const service = resolve("bar", 1, 2);

            service.should.have.property("foo").which.is.a.Function();
            service.should.have.property("required").which.is.equal(1);
            service.should.have.property("optional").which.is.equal(2);
        });
    });

    describe(".make()", function() {
        /**
         * Probamos que 'make' es un alias de 'resolve'.
         */
        it("should be an alias of 'resolve'", function() {
            const service_1 = container.resolve("foo");
            const service_2 = container.make("foo");

            service_1.should.have.property("bar").which.is.a.Function();
            service_2.should.have.property("bar").which.is.a.Function();

            service_1.should.be.equal(service_2);
        });
    });

    describe(".alias()", function() {
        /**
         * Probamos a resolver una dependencia a través de un alias.
         */
        it("should register an abstract with an alias", function() {
            const service_1 = resolve("foo");
            const service_2 = resolve("foo-alias");

            service_1.should.have.property("bar").which.is.a.Function();
            service_2.should.have.property("bar").which.is.a.Function();

            service_1.should.be.equal(service_2);
        });

        /**
         * Probamos a resolver una dependencia a través de un alias recursivo'.
         */
        it("should register an abstract with an alias recursively", function() {
            const service_1 = resolve("foo");
            const service_2 = resolve("foo-alias");
            const service_3 = resolve("foo-alias-of-alias");

            service_1.should.have.property("bar").which.is.a.Function();
            service_2.should.have.property("bar").which.is.a.Function();
            service_3.should.have.property("bar").which.is.a.Function();

            service_1.should.be.equal(service_2);
            service_2.should.be.equal(service_3);
            service_3.should.be.equal(service_1);
        });
    });
});

describe('bind()', function() {
    /**
     * Probamos a inyectar una dependencia al inicializar un modelo.
     */
    it("should inject dependency in class initialization", function() {
        const model = new FooModel();
        const service = resolve("foo");

        model.service.should.have.property("bar").which.is.a.Function();
        service.should.have.property("bar").which.is.a.Function();

        model.service.should.be.equal(service);
    });

    /**
     * Probamos a inyectar una dependencia asíncronamente a través de un miembro de la clase.
     */
    it("should inject async dependency through class member", function() {
        const model = new FooModel();
        const service = resolve("foo");

        model.serviceInjected().should.have.property("bar").which.is.a.Function();
        service.should.have.property("bar").which.is.a.Function();

        model.serviceInjected().should.be.equal(service);
    });
});