import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ICellRendererParams, RowNode } from 'ag-grid/main';
import * as TypeMoq from 'typemoq';

import { DetailPanelComponent } from './detail-panel.component';

describe('DetailPanelComponent', () => {
	let comp: DetailPanelComponent;
	let fixture: ComponentFixture<DetailPanelComponent>;
	let de: DebugElement;
	let el: HTMLElement;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DetailPanelComponent],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DetailPanelComponent);

		comp = fixture.debugElement.componentInstance;
		de = fixture.debugElement.query(By.css('div.detail-panel-container'));
		el = de.nativeElement;

		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(comp).toBeDefined();
		expect(typeof comp['agInit']).toEqual('function');
	});

	describe('Detail Grid', () => {
		let gridDebugElement: DebugElement;
		let gridNativeElement: any;

		beforeEach(() => {
			gridDebugElement = de.query(By.css('ag-grid-angular'));
			gridNativeElement = gridDebugElement.nativeElement;
		});

		it('should have grid element', () => {
			expect(gridDebugElement.componentInstance).toBeDefined();
			expect(gridNativeElement.className).toEqual('ag-material detail-panel-container__grid-item');
		});

		/**
		 * this test will fail in PhantomJS as it does not suport ES6 Proxy.
		 * ES6 Proxy can't be polyfilled either.
		 *
		 * https://stackoverflow.com/questions/38203063/using-es6-proxy-with-phantomjs#38204823
		 * https://www.npmjs.com/package/core-js#missing-polyfills
		 */
		it('should have 3 columns', () => {
			const mock: TypeMoq.IMock<ICellRendererParams> = TypeMoq.Mock.ofType<ICellRendererParams>();
			comp.agInit(mock.object);

			fixture.detectChanges();

			const columnDefinitions =
				gridNativeElement.gridOptions &&
				gridNativeElement.gridOptions.columnDefs;
			expect(columnDefinitions).toBeDefined();
			expect(columnDefinitions.length).toEqual(3);
		});
	});
});
