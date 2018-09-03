import Component from '../../core/component.class.js';
import searchTemplate from './search.template.js';

const searchComponent = new Component({
    name: 'search-component',
    template: searchTemplate,
    model:[],
    isRouted: true,
    controller: () => {

    }
})

export default searchComponent