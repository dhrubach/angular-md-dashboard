import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { GridPaginationComponent, IPagination } from './grid-pagination.component';

describe('GridPaginationComponent', () => {
	let fixture: ComponentFixture<GridPaginationComponent>;
	let comp;
	let de: DebugElement;
	let el: HTMLElement;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [GridPaginationComponent],
			schemas: [NO_ERRORS_SCHEMA],
		});
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(GridPaginationComponent);
		comp = fixture.componentInstance;
		de = fixture.debugElement.query(By.css('div.pagination-card-item__card-content-right-action'));
		el = de.nativeElement;

		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(comp).toBeDefined();
		expect(el).toBeDefined();
	});

	it('should invoke refreshPageView on button click', () => {
		const button = el.querySelector('button');
		spyOn(comp, 'refreshPageView');
		button.click();
		expect(comp.refreshPageView).toHaveBeenCalled();
	});

	it('should disable navigation buttons', () => {
		const config: IPagination = {
			currentPage: 0,
			pageSize: 10,
			totalPage: 1,
			totalRecords: 9,
		};

		comp.setActionButtonState(config);

		fixture.detectChanges();

		expect(comp.disableFirstAndPrevious).toBeTruthy();
		expect(comp.disableNextAndLast).toBeTruthy();
	});

	it('should enable forward navigation buttons', () => {
		const config: IPagination = {
			currentPage: 0,
			pageSize: 10,
			totalPage: 2,
			totalRecords: 19,
		};

		comp.setActionButtonState(config);

		fixture.detectChanges();

		expect(comp.disableFirstAndPrevious).toBeTruthy();
		expect(comp.disableNextAndLast).toBeFalsy();
	});

	it('should set page labels', () => {
		const config: IPagination = {
			currentPage: 1,
			pageSize: 10,
			totalPage: 2,
			totalRecords: 19,
		};

		comp.setPageLabels(config);

		fixture.detectChanges();

		expect(comp.startIndex).toEqual(11);
		expect(comp.lastIndex).toEqual(19);
	});
});
