
class Emitter {

    constructor (name, element, options){
        this.name = name;
        this.element = element;
        this.options = options;

        this.event = this.makeEvent() || null;
    }

    emit () { 
        const elem = document.querySelector(this.element)
        elem.dispatchEvent(this.event)        
    }

    makeEvent () {

        const config = {
                detail: this.options.data,
                bubbles:true,
                cancelable:true            
        }

        return new CustomEvent(this.name, config);

    }

   
}

const $$ = (element, eventName, callback) => {
    const targetElement = document.querySelector(element)
    targetElement.addEventListener(eventName, callback);
    return this;
}

const $ = document.querySelector.bind(document);

export {Emitter, $$, $}



