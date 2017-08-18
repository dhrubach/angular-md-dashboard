import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AgGridModule } from 'ag-grid-angular';
import { ColDef, Events, RowNode } from 'ag-grid/main';

import { UploadComponent } from './upload.component';
import { UploadDataService } from './upload.service';

import { UploadModule } from './upload.module';

describe('UploadComponent', () => {
	let comp;
	let fixture: ComponentFixture<UploadComponent>;
	let el: HTMLElement;
	let de: DebugElement;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [],
			imports: [
				AgGridModule.withComponents([]),
				NoopAnimationsModule,
				UploadModule,
			],
			providers: [UploadDataService],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UploadComponent);
		comp = fixture.componentInstance;
		fixture.detectChanges();

		de = fixture.debugElement.query(By.css('div.upload-container'));
		el = de.nativeElement;
	});

	it('create upload component', async () => {
		const upload = fixture.debugElement.componentInstance;
		expect(upload).toBeTruthy();
	});

	it('should check for number of child nodes on the component', () => {
		expect(fixture.elementRef.nativeElement.children[0].children.length).toEqual(2);
	});

	it('should check the Header of the form', () => {
		const content = fixture.nativeElement.children[0].children[0].children[0].children[0].children[1].textContent;
		expect(content === 'Upload image').toBeTruthy();
	});

	it('should check the header of the grid', () => {
		const header = fixture.nativeElement.children[0].children[1].children[0].children[0].children[1].textContent;
		expect(header === 'Uploads').toBeTruthy();
	});
});
