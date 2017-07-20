import { Component, OnInit } from '@angular/core';

import * as Chartist from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';

import { BaseChartComponent, IChartData } from './base-chart.component';

@Component({
	styles: [require('./chart.component.scss'), require('./pie-chart.component.scss')],
	template: require('./pie-chart.template.html'),
})
export class PieChartComponent extends BaseChartComponent implements OnInit {

	private statusCodeDataList: Chartist.IChartistSeriesData[] | number[] | number[][];

	constructor() {
		super();
	}

	public ngOnInit(): void {
		this.event = {
			created: (chart) => {
				if (chart && chart.svg) {
					const nodeList: any = chart.svg._node.childNodes;
					if (nodeList && nodeList.length) {
						(nodeList as SVGGElement[]).forEach((gElement) => {
							gElement.addEventListener('click', this.onPieElementClick.bind(this));
						});
					}
				}
			},
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

					data.element.attr({
						'data-label': data.meta,
						'data-value': data.value,
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

		this.prepareStatusCodeTableData(this.config.data);
	}

	private onPieElementClick($event: MouseEvent): void {
		/*
		* Typescript definition does not define a 'dataset' property on SVGElement.
		* Cast 'target' to HTMLElement as a work around
		*/
		const dataset: DOMStringMap = ($event.target as HTMLElement).dataset;
		if (dataset) {
		}
	}

	private prepareStatusCodeTableData(data: Chartist.IChartistData): void {
		this.statusCodeDataList = data.series;
	}
}
