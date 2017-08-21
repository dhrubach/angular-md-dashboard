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
		let gridElement: Element;

		beforeEach(() => {
			gridElementContainer = el.children.item(1) as HTMLElement;
			gridElement = gridElementContainer.getElementsByClassName('exception-card-item__card-content-grid').item(0);
		});

		test('should have grid container', () => {
			expect(gridElementContainer).toBeTruthy();
			expect(gridElementContainer.className).toEqual('exception-container-grid');
		});

		test('should have grid element', () => {
			expect(gridElement).toBeTruthy();
		});

		test('should have rendered rows', () => {
			const gridElementBodyElement = gridElement.getElementsByClassName('ag-body ag-body-viewport') as HTMLCollection;
			expect(gridElementBodyElement).toBeTruthy();

			const numberOfChildren = gridElementBodyElement.item(0).childNodes;
			expect(numberOfChildren.length).toEqual(13);
		});
	});
});
