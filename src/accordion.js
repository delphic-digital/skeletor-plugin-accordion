import {skeletor, SkeletorPlugin } from 'skeletor';

class Accordion extends SkeletorPlugin {
	constructor(element, options){
		super(element, options)
		console.log('created a new accordion')
	}
}

Accordion.register()