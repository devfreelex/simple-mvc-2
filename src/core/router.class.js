import { RouterError } from './customError.class.js';

export default class Router {
    constructor(routeDefault, routeOtherWise, routes) {
        this.routerElement = document.querySelector('router-component');
        this.routeDefault = routeDefault;
        this.routeOtherWise = routeOtherWise;
        this.routes = routes;
        this.modules = {};
        this.activatedRoute = {};
    }

    init(modules) {
        this.modules = modules;
        this.setActiveRoute(this.routeDefault);
        this.redirectTo(this.routeDefault);
        this.listenRoutes();

    }

    listenRoutes() {
        window.addEventListener('hashchange', () => this.navigate(), false);
        window.addEventListener('DOMContentLoaded', () => this.navigate(), false);
    }

    navigate() {
        let routeModule = {};

        if (this.isValidRoute()) {
            this.setActiveRoute(this.getHash())
            routeModule = this.extractModule(this.activatedRoute)
            this.readComponents(routeModule);
            return;
        }

        this.setActiveRoute(this.routeOtherWise);
        routeModule = this.extractModule(this.activatedRoute)
        this.readComponents(routeModule);        

    }

    isActivated() {
        const keys = Object.keys(this.activatedRoute);
        return keys.length > 0
    }

    extractModule (hash) {

        const route = this.routes.filter( route => {
            return route.path == hash;
        }).pop()

        return this.modules[route.module];
    }

    readModules(route) { 
        const module = route.module;
        this.readComponents(this.modules[module])
    }

    readComponents(module) {
        this.routerElement.innerHTML = '';
        for (let component in module) {
            if (module[component].isRouted)  module[component].init(this.routerElement)
            
        }
    }

    isValidRoute() {
        return this.routes.some( route => route.path == this.getHash())
    }

    setActiveRoute(route) {
        this.activatedRoute = route;
    }

    redirectTo (hash) {
        window.location.hash = hash;
    }

    getHash () {
        return window.location.hash.replace('#', '')
    }

}