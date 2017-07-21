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
	private highlightStatusCodeRow: number;

	constructor() {
		super();
	}

	public ngOnInit(): void {
		this.event = {
			created: (chart) => {
				if (chart && chart.svg) {

					const chartDataSeries = [];
					let pathValue = -1;
					let totalDataSum = 0;

					const nodeList: any = chart.svg._node.childNodes;
					if (nodeList && nodeList.length) {
						(nodeList as SVGGElement[]).forEach((gElement, index) => {
							gElement.addEventListener('mouseover', this.onPieElementMouseOver.bind(this));
							gElement.addEventListener('mouseout', this.onPieElementMouseOut.bind(this));
							pathValue = +(gElement.firstElementChild.getAttribute('ct:value')) || 0;
							chartDataSeries.push({ index, pathValue });
							totalDataSum += pathValue;
						});
					}

					const labelGroup = chart.svg.elem('g', null, null);
					const center = {
						x: chart.chartRect.x1 + chart.chartRect.width() / 2,
						y: chart.chartRect.y2 + chart.chartRect.height() / 2,
					};

					labelGroup.elem('text', {
						'dx': center.x,
						'dy': center.y,
						'text-anchor': 'middle',
					}, 'ct-label-total-sum').text(totalDataSum);

					chartDataSeries.forEach((data) => {
						labelGroup.elem('text', {
							'dx': center.x,
							'dy': center.y,
							'text-anchor': 'middle',
						}, 'ct-label').text(data.pathValue);
					});
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
						'data-index': data.index,
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

	private onPieElementMouseOver($event: MouseEvent) {
		/*
		* Typescript definition does not define a 'dataset' property on SVGElement.
		* Cast 'target' to HTMLElement as a work around
		*/
		const dataset: DOMStringMap = ($event.target as HTMLElement).dataset;
		if (dataset) {
			this.highlightStatusCodeRow = +dataset.index;
		}

		this.setVisibilityOfSVGTextElement(
			$event.target as SVGGElement,
			+dataset.index,
			'visible',
			'ct-label',
		);

		this.setVisibilityOfSVGTextElement(
			$event.target as SVGGElement,
			0,
			'hidden',
			'ct-label-total-sum',
		);

	}

	private onPieElementMouseOut($event: MouseEvent) {
		this.highlightStatusCodeRow = -1;
		const dataset: DOMStringMap = ($event.target as HTMLElement).dataset;

		this.setVisibilityOfSVGTextElement(
			$event.target as SVGGElement,
			+dataset.index,
			'hidden',
			'ct-label',
		);

		this.setVisibilityOfSVGTextElement(
			$event.target as SVGGElement,
			0,
			'visible',
			'ct-label-total-sum',
		);

	}

	private setVisibilityOfSVGTextElement(
		element: SVGElement,
		index: number,
		visibility: string,
		textNodeClassName: string): void {
			const ownerSVGElement = element.ownerSVGElement;
			const highlightedSVGTextNode: SVGTextElement =
				this.retrieveSVGTextElement(ownerSVGElement, index, textNodeClassName);
			if (highlightedSVGTextNode) {
				highlightedSVGTextNode.style.visibility = visibility;
			}
	}

	private retrieveSVGTextElement(
		ownerSVGElement: SVGElement,
		index: number,
		textNodeClassName: string): SVGTextElement {
			let labelNode: SVGTextElement;
			if (ownerSVGElement) {
				const textLabelNodes = ownerSVGElement.getElementsByClassName(textNodeClassName);
				labelNode = textLabelNodes[index] as SVGTextElement;
			}
			return labelNode;
	}

	private prepareStatusCodeTableData(data: Chartist.IChartistData): void {
		this.statusCodeDataList = data.series;
	}
}
