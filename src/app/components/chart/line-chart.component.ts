import { Component, OnInit } from '@angular/core';

import * as Chartist from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';

import { BaseChartComponent } from './base-chart.component';

@Component({
	styles: [require('./chart.component.scss')],
	template: require('./chart.template.html'),
})
export class LineChartComponent extends BaseChartComponent implements OnInit {

	constructor() {
		super();
	}

	public ngOnInit(): void {
		this.event = {
			draw: (data) => {
				if (data.path) {
					data.element.animate({
						d: {
							begin: 600,
							dur: 700,
							easing: Chartist.Svg.Easing.easeOutQuint,
							from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
							to: data.path.clone().stringify(),
						},
					});
				}
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
		};
	}

}
