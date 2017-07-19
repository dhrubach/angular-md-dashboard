import { Component, OnInit } from '@angular/core';

import * as Chartist from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';

import './plugins/chartist-bar-labels';

import { BaseChartComponent } from './base-chart.component';

@Component({
	styles: [require('./chart.component.scss')],
	template: require('./chart.template.html'),
})
export class BarChartComponent extends BaseChartComponent implements OnInit {

	constructor() {
		super();
	}

	public ngOnInit(): void {
		this.event = {
			draw: (data: any) => {
				data.element.animate({
					y2: {
						begin: 50,
						dur: 700,
						from: data.y1,
						to: data.y2,
					},
				});
			},
		};

		this.options = {
			axisX: {
				offset: 15,
				showLabel: true,
			},
			axisY: {
				offset: 20,
				showLabel: true,
			},
			plugins: [
				Chartist.plugins.ctBarLabels(),
			],
		};
	}

}
