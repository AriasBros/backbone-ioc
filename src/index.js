import Provider from "./Provider";
import Container from "./Container";
import container from "./Container";

import Application from "./mixins/Application";

import alias from "./helpers/alias";
import bind from "./helpers/bind";
import inject from "./helpers/inject";
import resolve from "./helpers/resolve";
import make from "./helpers/resolve";
import singleton from "./helpers/singleton";

export { Application, Provider, Container, container, bind, singleton, resolve, make, alias, inject };