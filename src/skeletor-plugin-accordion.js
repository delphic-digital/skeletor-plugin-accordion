/**
 * @copyright   2017, The Skeletor Project
 * @license     http://opensource.org/licenses/BSD-3-Clause
 */

 //https://www.w3.org/TR/wai-aria-practices/examples/accordion/accordion1.html

import SkeletorPlugin from 'skeletor-plugin-base';
import AccordionItem from './skeletor-accordion-item'

class Accordion extends SkeletorPlugin {

	constructor(element, options){
		super(element, options);

		this._attachShadowRoot();

		this.VERSION = '0.3.0';

		this.defaults = {
			active: 0,
			collapsible: true,
			singleOpen: true,
			duration: 200,
			easing: 'swing'
		}
	}

	_attachShadowRoot(){
		// Attach a shadow root.
		this.attachShadow({mode: 'open'}).innerHTML = `

			<style>

				:host         { display:block; margin: 0 0 40px; padding: 20px; }
				:focus        { outline: 1px solid red; }

			</style>

			<slot name="item"></slot>
		`;
	}

	//Init is fired when custom element is "connected".
	init(){
		super.init();

		//Define custom element for child items
		window.customElements.define("skeletor-accordion-item", AccordionItem);

		this.setAttribute('id', this.UUID);
		this.setAttribute('role', 'tablist');
		this.setAttribute('aria-multiselectable', 'true');

		this.setInitialAttributes();

		this.addEventListener('toggle', e => {
			//console.log('toggle', e.target)

			this.closeAll();

			let panel = e.target.shadowRoot.querySelector('dd'),
			    heading = e.target.shadowRoot.querySelector('dt a');

			heading.setAttribute('aria-expanded', 'true');
			heading.setAttribute('aria-disabled', 'true');
			panel.setAttribute('aria-hidden', 'false');
		});

	}

	setInitialAttributes(){

		this.headings.forEach((item, index) => {
			item.setAttribute('aria-controls', this.UUID + '-item-' + index);
			item.setAttribute('id', this.UUID + '-heading-' + index);
		})

		this.panels.forEach((item, index) => {
			item.setAttribute('id', this.UUID + '-item-' + index);
			item.setAttribute('aria-labelledby', this.UUID + '-item-' + index);
		})
	}

	closeAll(){
		this.headings.forEach((item) => {
			item.setAttribute('aria-expanded', 'false');
			item.setAttribute('aria-disabled', 'false');
		})
		this.panels.forEach((item) => { item.setAttribute('aria-hidden', 'true'); })
	}

	open(value){
		console.log('open', value)
	}

	get items(){
		return this.querySelectorAll('skeletor-accordion-item');
	}

	get headings(){
		return Array.from(this.items, item => item.shadowRoot.querySelector('dt a'));
	}

	get panels(){
		return Array.from(this.items, item => item.shadowRoot.querySelector('dd'));
	}


	static get ELEMENT_NAME() {
		return "skeletor-accordion";
	}
}



export default Accordion;