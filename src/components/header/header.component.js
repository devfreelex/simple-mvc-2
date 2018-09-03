import {$$} from '../../core/events.class.js'

import Component from '../../core/component.class.js';
import headerTemplate from './header.template.js';


const headerComponent = new Component({
    name:'header-component',
    template:headerTemplate,
    isRouted: false,
    model: [],
    controller: (model, template) => {
        
        model.title = 'um teste';


        $$('header-component', 'click', (e) => { 
            model.title = 'outro título'
        })


    }
})

export default headerComponent