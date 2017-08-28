import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SideNavComponent } from './sidenav.component';

describe('SideNavComponent', () => {
	let comp;
	let fixture: ComponentFixture<SideNavComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SideNavComponent],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SideNavComponent);
		comp = fixture.componentInstance;

		fixture.detectChanges();
	});

	it('should have side menu items', async () => {
		const listItems = fixture.debugElement.componentInstance.listItems;
		expect(listItems.length).toEqual(4);
	});

	it('should have header with title', () => {
		const sideNavHeaderTitleText: DebugElement =
			fixture.debugElement.query(By.css('span.sidenav-header-container__title-text'));
		expect(sideNavHeaderTitleText).toBeDefined();

		const nativeElement = sideNavHeaderTitleText.nativeElement;
		expect(nativeElement.innerText).toEqual('ADMIN DASHBOARD');
	});
});
