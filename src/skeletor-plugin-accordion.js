/**
 * @copyright   2017, The Skeletor Project
 * @license     http://opensource.org/licenses/BSD-3-Clause
 */

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

	get items(){
		return this.querySelectorAll('skeletor-accordion-item');
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

		this.addEventListener('toggle', e => {
			//console.log('toggle', e.target)

			this.closeAll();

			let panel = e.target.shadowRoot.querySelector('dd'),
			    heading = e.target.shadowRoot.querySelector('dt');

			heading.setAttribute('aria-expanded', 'true');
			panel.setAttribute('aria-hidden', 'false');
		});

	}

	closeAll(){
		this.items.forEach((item, index) => {
			item.shadowRoot.querySelector('dt').setAttribute('aria-expanded', 'false');
			item.shadowRoot.querySelector('dd').setAttribute('aria-hidden', 'true');
		})
	}

	open(value){
		console.log('open', value)
	}


	static get ELEMENT_NAME() {
		return "skeletor-accordion";
	}
}



export default Accordion;