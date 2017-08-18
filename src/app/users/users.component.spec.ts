import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AgGridModule } from 'ag-grid-angular';
import { ColDef, Events, RowNode } from 'ag-grid/main';

import { UserComponent } from './users.component';
import { UserDataService } from './users.service';

import { UsersModule } from './users.module';

describe('UserComponent', () => {
	let comp;
	let fixture: ComponentFixture<UserComponent>;
	let el: HTMLElement;
	let de: DebugElement;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [],
			imports: [
				AgGridModule.withComponents([]),
				NoopAnimationsModule,
				UsersModule,
			],
			providers: [UserDataService],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UserComponent);
		comp = fixture.componentInstance;
		fixture.detectChanges();

		de = fixture.debugElement.query(By.css('md-card-header'));
		el = de.nativeElement;
	});

	it('create user component', async () => {
		const user = fixture.debugElement.componentInstance;
		expect(user).toBeTruthy();
	});

	it('should create grid API in the component', async () => {
		fixture.detectChanges();
		expect(comp.gridOptions.api).toBeTruthy();
	});

	it('should create number of column headers in the grid to be', () => {
		expect(comp.gridOptions.columnDefs.length).toEqual(6);
	});

	it('should create Number of rows in the grid to be', () => {
		fixture.detectChanges();
		const NoOfRows = comp.gridOptions.rowData.length;
		expect(NoOfRows === 15).toBeTruthy();
	});

	it('should create Header text in the card to be', () => {
		const headerText = de.nativeNode.children[1].innerText;
		expect(headerText === 'Application Users').toBeTruthy();
	});
});
