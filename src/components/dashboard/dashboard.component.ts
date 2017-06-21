import { Component } from '@angular/core';

import { CardData } from './../card/card.component';

@Component({
	selector: 'adm-dashboard',
	styles: [require('./dashboard.component.scss')],
	template: require('./dashboard.template.html'),
})
export class DashboardComponent {

	private cards: CardData[];

	constructor() {
		this.cards = [
			{
				content: `
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Conse quuntur, rem, animi. Harum dolor sequi provident temporibus
					nihi l quasi doloremque sapiente.
				`,
				header: '+20 Exceptions',
				icon: 'error',
				type: 'exception',
			},
			{
				content: `
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Conse quuntur, rem, animi. Harum dolor sequi provident temporibus
					nihi l quasi doloremque sapiente.
				`,
				header: '2 Servers Online',
				icon: 'computer',
				type: 'server',
			},
			{
				content: `
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Conse quuntur, rem, animi. Harum dolor sequi provident temporibus
					nihi l quasi doloremque sapiente.
				`,
				header: '+10 Users Online',
				icon: 'error',
				type: 'user',
			},
		];
	}
}
