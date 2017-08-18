import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CardComponent } from '../components';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
	let fixture: ComponentFixture<DashboardComponent>;
	let comp;
	let de: DebugElement;
	let el;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DashboardComponent, CardComponent],
			imports: [NoopAnimationsModule],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DashboardComponent);
		fixture.detectChanges();
	});

	it('should be created and should have dashboard container', () => {
		comp = fixture.debugElement.componentInstance;
		de = fixture.debugElement.query(By.css('div.dashboard-container'));
		el = de.nativeElement;
		expect(comp).toBeTruthy();
		expect(el).toBeTruthy();
	});

	it('should contain cards and charts', () => {
		let eleCount = 0;
		if (el.childNodes && el.childNodes.length) {
			el.childNodes.forEach((element) => {
				if (element.classList) {
					if (element.classList.value === 'card-container'
						|| element.classList.value === 'chart-container') {
						eleCount++;
					}
				}
			});
		}
		expect(eleCount).toEqual(2);
	});

	it('should have 3 cards and 2 charts', () => {
		const cards = comp.cards;
		const charts = comp.charts;
		expect(cards.length).toBe(3);
		expect(charts.length).toBe(2);
	});
});
