import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[adm-host-chart]',
})
export class HostChartDirective {
	constructor(public viewContainerRef: ViewContainerRef) {}
}
