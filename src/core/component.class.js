import { Emitter, $$, $ } from './events.class.js';

export default class Component {
    constructor(config) {
        this.name = config.name;
        this.templater = config.template;
        this.controller = config.controller;
        this.model = this.proxify(config.model, this.rerender.bind(this));
        this.routerContainer = '';
        this.isRouted = config.isRouted || false;
    }

    init(routerElement) {
        this.startController();
        this.render(routerElement);

    }


    proxify(model, callback) {

        const handler = {

            get(target, name) {
                if (name in target) {
                    return target[name]
                }

                target[name] = null;
            },

            set(target, prop, val) {

                target[prop] = val;

                callback();
                return true
            }

        }

        const proxy = new Proxy(model, handler);
        return proxy;
    }


    render(routerContainer) {

        if (!this.isRouted) {

            const template = document.createElement(this.name);
            const container = $(this.name);

            template.innerHTML = this.templater(this.model);
            container.insertAdjacentHTML('beforeend', template.innerHTML);

        } 
        
        if (routerContainer) {

            if (routerContainer) this.routerContainer = routerContainer;

            const template = document.createElement(this.name);
            template.innerHTML = this.templater(this.model);

            routerContainer.insertAdjacentHTML('beforeend', template.outerHTML);
            
        }

        this.fireEvents()

    }

    rerender() {

        if (!this.isRouted) {

            const container = $(this.name);
            const template = document.createElement(this.name);

            template.innerHTML = this.templater(this.model);
            container.outerHTML = template.outerHTML;

        } else {

            const container = this.routerContainer.querySelector(this.name)
            const template = this.templater(this.model);

            container.innerHTML = template

        }

    }

    startController() {

        const start = () => this.controller(this.model, $(this.name));
        document.addEventListener(`${this.name}-controller`, () => setTimeout(start, 300));

    }

    fireEvents() { 
        
        const startController = new Emitter(`${this.name}-controller`, this.name, {});
        console.log(startController)
        startController.emit();

    }

}