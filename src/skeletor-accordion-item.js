/**
 * @copyright   2017, The Skeletor Project
 * @license     http://opensource.org/licenses/BSD-3-Clause
 */

//import { tween } from 'popmotion';

class AccordionItem extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({mode: 'open'}).innerHTML = `

			<style>

				:focus                   { outline: 1px solid red; }
				dt                       { padding: 0 10px; font-size: 1.5em; cursor: pointer; border: 1px solid pink; }
				dt[aria-selected="true"] { outline: 1px solid red; }
				dd                       { display: block; margin: 0; padding: 10px; border: 1px solid black; }
 				dd[aria-hidden="true"]   { display: none; }

			</style>

			<dt role="heading">
				<a role="button" aria-expanded="false">
					<slot name="header"></slot>
				</a>
			</dt>
			<dd role="region" aria-hidden="true">
				<div>
					<slot name="content"></slot>
				</div>
			</dd>
		`;
	}

	get headerElm(){
		return this.shadowRoot.querySelector('dt a');
	}

	get contentElm(){
		return this.shadowRoot.querySelector('dd');
	}

	connectedCallback() {
		this.init();
	};

	init(){
		//this.shadowRoot.querySelector('dd').setAttribute('role', 'region');
		this.headerElm.addEventListener('click', e => {
			this.dispatchEvent(new Event('toggle', {bubbles: true, composed: true}));
		});
	}

}

export default AccordionItem;