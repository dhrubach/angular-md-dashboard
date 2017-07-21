(function (window, document, Chartist) {
	'use strict';

	var defaultOptions = {
		labelClass: 'ct-label',
		labelClassTotal: 'ct-label-total',
		labelOffset: {
			x: 0,
			y: 0,
		}
	};

	Chartist.plugins = Chartist.plugins || {};
	Chartist.plugins.ctDonutLabels = function (options) {

		options = Chartist.extend({}, defaultOptions, options);

		return function ctDonutLabels(chart) {
			if (chart instanceof Chartist.Pie) {
				chart.on('created', function (chart) {
					if (chart && chart.svg) {

						var chartDataSeries = [];
						var pathValue = -1;
						var totalDataSum = 0;

						var nodeList = chart.svg._node.childNodes;
						if (nodeList && nodeList.length) {
							nodeList.forEach((gElement, index) => {
								gElement.addEventListener('mouseover', onDonutSliceMouseOver.bind(this));
								gElement.addEventListener('mouseout', onDonutSliceMouseOut.bind(this));
								pathValue = +(gElement.firstElementChild.getAttribute('ct:value')) || 0;
								chartDataSeries.push({ index, pathValue });
								totalDataSum += pathValue;
							});
						}

						var labelGroup = chart.svg.elem('g', null, null);
						var center = {
							x: chart.chartRect.x1 + chart.chartRect.width() / 2,
							y: chart.chartRect.y2 + chart.chartRect.height() / 2,
						};

						labelGroup.elem('text', {
							'dx': center.x,
							'dy': center.y + 6,
							'text-anchor': 'middle',
						}, options.labelClassTotal).text(totalDataSum);

						chartDataSeries.forEach((data) => {
							labelGroup.elem('text', {
								'dx': center.x,
								'dy': center.y,
								'text-anchor': 'middle',
							}, options.labelClass).text(data.pathValue);
						});
					}
				});
			}
		};

		function onDonutSliceMouseOver($event) {
			var dataset = $event.target.dataset;

			_setVisibilityOfSVGTextElement(
				$event.target,
				+dataset.index,
				'visible',
				options.labelClass,
			);

			_setVisibilityOfSVGTextElement(
				$event.target,
				0,
				'hidden',
				options.labelClassTotal,
			);
		}

		function onDonutSliceMouseOut($event) {
			var dataset = $event.target.dataset;

			_setVisibilityOfSVGTextElement(
				$event.target,
				+dataset.index,
				'hidden',
				options.labelClass,
			);

			_setVisibilityOfSVGTextElement(
				$event.target,
				0,
				'visible',
				options.labelClassTotal,
			);
		}

		function _setVisibilityOfSVGTextElement(element, index, visibility, textNodeClassName) {
			var ownerSVGElement = element.ownerSVGElement;
			var highlightedSVGTextNode =
				_retrieveSVGTextElement(ownerSVGElement, index, textNodeClassName);
			if (highlightedSVGTextNode) {
				highlightedSVGTextNode.style.visibility = visibility;
			}
		}

		function _retrieveSVGTextElement(ownerSVGElement, index, textNodeClassName) {
			if (ownerSVGElement) {
				var textLabelNodes = ownerSVGElement.getElementsByClassName(textNodeClassName);
				return textLabelNodes[index];
			}
			return null;
		}

	};

})(window, document, Chartist);
