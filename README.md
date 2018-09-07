# Backbone IoC
Dependency injection for Backbone applications made easy.

## Examples

#### Registering dependencies

We create our service providers:

```javascript
class MyProvider extends Provider {
    register() {
        
    }
    
    boot() {
        this.app.bind("my-dependency", MyImplementationClass);
    }
}
```

In our application, we register our providers:

**Using native Javascript Class**

```javascript
class MyApp {
    constructor() {
        this.serviceProviders = [
            MyProvider,
            OtherProvider,
            ...
        ];
        
        this.registerServiceProviders();
    }
}
```

**Using Backbone Class**

```javascript
const MyApp = function() {
    this.initialize();
};

_.extend(MyApp.prototype, {
    serviceProviders: [
        MyProvider,
        OtherProvider,
        ...
    ],
    
    initialize() {
        this.registerServiceProviders();
    }
});
```

**In both cases**

```javascript
import ApplicationMixin from "backbone-ioc/src/mixins/Application";
_.extend(MyApp.prototype, ApplicationMixin);
```

Now, we can inject our services in any other application component.

```javascript
const MyView = Backbone.View.extend({
    // Service injected as a function that returns the dependency.
    serviceInjected: inject("my-dependency"),
    
    initialize() {
        // Service injected as an instance.
        this.serviceResolved = resolve("my-dependency");
    }
});
```

