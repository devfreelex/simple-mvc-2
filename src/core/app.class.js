export default class App {
    constructor(config){
        this.router = config.router || null;
        this.modules = Object.assign({}, config.modules) || {};
    }

    init () {
        if (this.isRouted()) this.router.init(this.modules)  
        this.readModules(this.modules);
        
    }

    isRouted () { 
        return this.router !== null
    }

    readModules (modules) {
        for (let module in modules) {
            this.readComponents(modules[module])
        }
    }

    readComponents (components) {
        for (let component in components) {
            if (!components[component].isRouted)  components[component].init()
        }
    }


}