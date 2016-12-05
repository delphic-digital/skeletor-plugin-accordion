import {skeletor, SkeletorPlugin } from 'skeletor';

class Accordion extends SkeletorPlugin {
	constructor(element, options){
		super(element, options)
		this.VERSION = '0.1.0';

		this.defaults = {
			optionOne: true,
			optionTwo: false
		}

		console.log('created a new accordion')
	}
}

Accordion.register()