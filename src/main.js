import App from './core/app.class.js';
import Router from './core/router.class.js';

// MODULES
import sharedModule from './modules/shared.module.js';
import notFoundModule from './modules/notFound.module.js';

const router = new Router('/', '/404', [
    {path:'/', module:'sharedModule'},
    {path:'/dashboard', module:'sharedModule'},
    {path:'/404', module:'notFoundModule'}
]);


const app = new App({
    router: router,
    modules:{
        sharedModule,
        notFoundModule
    }
})

app.init()