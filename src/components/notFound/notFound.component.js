import Component from '../../core/component.class.js';
import notFoundTemplate from './notFound.template.js';

const notFoundComponent = new Component({
    name:'not-found-component',
    template: notFoundTemplate,
    model:[],
    isRouted:true,
    controller: (model, template) => {
        console.log('ok, notefound')
    }
})

export default notFoundComponent