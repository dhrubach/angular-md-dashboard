import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DetailPanelService } from './detail-panel/detail-panel.service';
import { ExceptionsComponent } from './exceptions.component';
import { ExceptionsDataService } from './exceptions.service';

describe('ExceptionsComponent', () => {
	let comp: ExceptionsComponent;
	let fixture: ComponentFixture<ExceptionsComponent>;
	let de: DebugElement;
	let el: HTMLElement;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ExceptionsComponent],
			imports: [NoopAnimationsModule],
			providers: [
				ExceptionsDataService,
				DetailPanelService,
			],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ExceptionsComponent);

		comp = fixture.debugElement.componentInstance;
		de = fixture.debugElement.query(By.css('div.exception-container'));
		el = de.nativeElement;

		fixture.detectChanges();
	});

	test('should be created', () => {
		expect(comp).toBeTruthy();
	});

	test('should have exceptions container element', () => {
		const numberOfChildren = el && el.children && el.children.length || 0;
		expect(numberOfChildren).toEqual(2);
	});

	describe('Chart Elements', () => {
		let exceptionElements: HTMLCollection;

		beforeEach(() => {
			exceptionElements = el.children;
		});

		test('should have chart elements', () => {
			expect(exceptionElements.item(0).className).toBe('exception-container-charts');
		});

		test('should have bar and pie chart', () => {

			const barElement = <any>exceptionElements.item(0).children[0];
			const barChartType = barElement.config.chartType;

			expect(barChartType).toEqual('Bar');

			const pieElement = <any>exceptionElements.item(0).children[1];
			const pieChartType = pieElement.config.chartType;

			expect(pieChartType).toEqual('Pie');
		});
	});

	describe('Exception Grid', () => {
		let gridElementContainer: HTMLElement;
		let gridDebugElement: DebugElement;
		let gridNativeElement: any;

		beforeEach(() => {
			gridElementContainer = el.children.item(1) as HTMLElement;
			gridDebugElement = de.query(By.css('ag-grid-angular'));
			gridNativeElement = gridDebugElement.nativeElement;
		});

		test('should have grid container', () => {
			expect(gridElementContainer).toBeTruthy();
			expect(gridElementContainer.className).toEqual('exception-container-grid');
		});

		test('should have grid element', () => {
			expect(gridNativeElement.id).toEqual('exception-grid');
			expect(gridNativeElement.className).toEqual('ag-material exception-card-item__card-content-grid');
			expect(gridDebugElement.componentInstance).toBeDefined();
		});

		test('should have 2 columns', () => {
			const columnDefinitions = gridNativeElement.columnDefs;
			expect(columnDefinitions).toBeDefined();
			expect(columnDefinitions.length).toEqual(2);
		});

		test('should have data rows', () => {
			const rowData = gridNativeElement.rowData;
			expect(rowData.length).toBeGreaterThanOrEqual(1);
		});
	});
});
