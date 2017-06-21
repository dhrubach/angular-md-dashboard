import { Component, Input } from '@angular/core';

interface ICardData {
	content: string;
	header: string;
	icon: string;
	type: 'exception' | 'server' | 'user';
}

@Component({
	selector: 'adm-card',
	styles: [require('./card.component.scss')],
	template: require('./card.template.html'),
})
class CardComponent {
	@Input() private content: string;
	@Input() private header: string;
	@Input() private icon: string;
	@Input() private type: 'exception' | 'server' | 'user';
}

export { CardComponent, ICardData };
