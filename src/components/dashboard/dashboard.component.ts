import { Component } from '@angular/core';

import * as Chartist from 'chartist';

import { ICardData } from './../card/card.component';
import { IChartData } from './../chart/chart.component';

@Component({
	selector: 'adm-dashboard',
	styles: [require('./dashboard.component.scss')],
	template: require('./dashboard.template.html'),
})
export class DashboardComponent {

	private cards: ICardData[];
	private charts: IChartData[];

	constructor() {
		this.cards = [
			{
				content: `
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Conse quuntur,
					rem, animi. Harum dolor sequi provident temporibus
					nihi l quasi doloremque sapiente.
				`,
				header: '+20 Exceptions',
				icon: 'error',
				type: 'exception',
			},
			{
				content: `
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Conse quuntur,
					rem, animi. Harum dolor sequi provident temporibus
					nihi l quasi doloremque sapiente.
				`,
				header: '2 Servers Online',
				icon: 'computer',
				type: 'server',
			},
			{
				content: `
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Conse quuntur,
					rem, animi. Harum dolor sequi provident temporibus
					nihi l quasi doloremque sapiente.
				`,
				header: '+10 Users Online',
				icon: 'error',
				type: 'user',
			},
		];

		this.charts = [
			{
				data:
				{
					labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
					series: [
						[10, 50, 40, 55, 100, 30, 10],
					],
				},
				header: 'Proposals',
				type: 'proposal',
			},
			{
				data:
				{
					labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
					series: [
						[50, 90, 40, 55, 100, 30, 40],
					],
				},
				header: 'New Accounts',
				type: 'accounts',
			},
		];
	}
}
