import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DetailPanelService } from './detail-panel/detail-panel.service';
import { ExceptionsComponent } from './exceptions.component';
import { ExceptionsDataService } from './exceptions.service';

describe('ExceptionsComponent', () => {
	let comp;
	let fixture: ComponentFixture<ExceptionsComponent>;
	let de: DebugElement;
	let el: HTMLElement;
	let exceptionElements;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ExceptionsComponent],
			imports: [
				NoopAnimationsModule,
			],
			providers: [
				ExceptionsDataService,
				DetailPanelService,
			],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ExceptionsComponent);
		fixture.detectChanges();
	});

	it('should be created', () => {
		comp = fixture.debugElement.componentInstance;
		expect(comp).toBeTruthy();
	});

	it('should have exceptions container element', () => {
		de = fixture.debugElement.query(By.css('div.exception-container'));
		el = de.nativeElement;
		if (el && el.children && el.children.length) {
			expect(el.children.length).toEqual(2);
		}
	});

	it('should have chart elements', () => {
		exceptionElements = el.children;
		expect(exceptionElements[0].className).toBe('exception-container-charts');
	});

	it('should have bar and pie chart', () => {
		expect(comp.barChart.chartType === exceptionElements[0].children[0].config.chartType).toBeTruthy();
		expect(comp.pieChart.chartType === exceptionElements[0].children[1].config.chartType).toBeTruthy();
	});

	it('should have grid element', () => {
		expect(exceptionElements[1].className).toBe('exception-container-grid');
	});

	it('should have Exceptions data grid', () => {
		const heading = exceptionElements[1].children[0].children[0].children[0].textContent;
		expect(heading).toBe('Exceptions');
		const content = fixture.debugElement.query(By.css('ag-grid-angular'));
		expect(content.name).toBe('ag-grid-angular');
	});

	it('should have rows and columns', () => {
		expect(comp.rowData.length).toEqual(13);
		expect(comp.masterColumnDefs.length).toEqual(2);
	});
});
