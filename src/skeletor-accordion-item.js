/**
 * @copyright   2017, The Skeletor Project
 * @license     http://opensource.org/licenses/BSD-3-Clause
 */


class AccordionItem extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({mode: 'open'}).innerHTML = `

			<style>

				:focus        { outline: 1px solid red; }
				header        { font-size: 1.5em; cursor: pointer; border: 1px solid pink; }
				header:focus  { outline: 1px solid red; }
				content       { display: block; padding: 20px 0; border: 1px solid black; }

			</style>

			<header><slot name="header"></slot></header>
			<div><slot name="content"></slot></div>
		`;
	}

	connectedCallback() {
		this.init();
	};

	init(){
		this.headerElm.setAttribute('role', 'tab');
		this.headerElm.setAttribute('aria-expanded', 'false');
		this.headerElm.setAttribute('aria-selected', 'false');
		//this.setAttribute('aria-controls', `${this.uuid}-section`);

		this.initEventListeners()
	}

	initEventListeners(){
		this.headerElm.addEventListener('click', e => {
			this.toggle();
			/*this.header.setAttribute('aria-expanded', 'true');
			this.header.setAttribute('aria-selected', 'true');*/
		});
	}

	toggle(){
		if(this.open){
			this.open=false
		}else{
			this.open=true
		}

		console.log(this.open)
	}

	attributeChangedCallback(name, oldValue, newValue) {
		console.log(`${name} attributes value changed`)

		if(this.open){
			this.headerElm.setAttribute('aria-expanded', 'true');
			this.headerElm.setAttribute('aria-selected', 'true');
		}else{
			this.headerElm.setAttribute('aria-expanded', 'false');
		}
	}


	//Observed attributes here will trigger the changed callback.

	static get observedAttributes() {
		return ['open'];
	}

	// A getter/setter for an open property.
	get open() {
		return this.hasAttribute('open');
	}

	set open(val) {
	// Reflect the value of the open property as an HTML attribute.
	if (val) {
		this.setAttribute('open', '');
	} else {
		this.removeAttribute('open');
	}
		//this.toggle();
	}

	get headerElm(){
		return this.shadowRoot.querySelector('header');
	}

	get contentElm(){
		return this.shadowRoot.querySelector('div');
	}
}

export default AccordionItem;