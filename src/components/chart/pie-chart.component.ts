import { Component, OnInit } from '@angular/core';

import * as Chartist from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';

import { BaseChartComponent } from './base-chart.component';

@Component({
	styles: [require('./chart.component.scss'), require('./pie-chart.component.scss')],
	template: require('./pie-chart.template.html'),
})
export class PieChartComponent extends BaseChartComponent implements OnInit {

	constructor() {
		super();
	}

	public ngOnInit(): void {
		this.event = {
			draw: (data) => {
				if (data.type === 'slice') {

					const pathLength = data.element._node.getTotalLength();

					data.element.attr({
						'stroke-dasharray': pathLength + 'px ' + pathLength + 'px',
					});

					const animationDefinition: any = {
						'stroke-dashoffset': {
							begin: '.5s',
							dur: 1000,
							easing: Chartist.Svg.Easing.easeOutQuint,
							fill: 'freeze',
							from: -pathLength + 'px',
							id: 'anim' + data.index,
							to: '0px',
						},
					};

					if (data.index !== 0) {
						animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
					}

					data.element.attr({
						'stroke-dashoffset': -pathLength + 'px',
					});

					data.element.animate(animationDefinition, false);
				}
			},
		};

		this.options = {
			chartPadding: 5,
			donut: true,
			donutWidth: 30,
			showLabel: false,
		};
	}

}
