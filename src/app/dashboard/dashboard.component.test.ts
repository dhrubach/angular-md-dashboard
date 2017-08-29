import { Component, DebugElement, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DashboardComponent } from './dashboard.component';
import { ICardData, IChartData } from '../index';

@Component({
	template: `
		<adm-card [content]="card.content" [header]="card.header"
				  [icon]="card.icon" [type]="card.type">
		</adm-card>
		<adm-chart [config]="chart"></adm-chart>
	`
})
class TestDashboardComponent implements OnInit {

	public card: ICardData;
	public chart: IChartData;

	public ngOnInit(): void {
		this.card = {
			content: 'test content',
			header: '+20 Exceptions',
			icon: 'error',
			type: 'exception',
		};

		this.chart = {
			chartType: 'Line',
			data:
			{
				labels: ['M'],
				series: [
					[10],
				],
			},
			header: 'Proposals',
			type: 'proposal',
		};
	}
}

describe('DashboardComponent', () => {
	let comp: DashboardComponent;
	let fixture: ComponentFixture<DashboardComponent>;
	let debugElement: DebugElement;
	let nativeElement: HTMLElement;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DashboardComponent, TestDashboardComponent],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DashboardComponent);
		comp = fixture.debugElement.componentInstance;
		debugElement = fixture.debugElement.query(By.css('div.dashboard-container'));
		nativeElement = debugElement.nativeElement;

		fixture.detectChanges();
	});

	test('should be created', () => {
		expect(comp).toBeTruthy();
	});

	test('should have card container', async(() => {
		const cardElement = debugElement.query(By.css('div.card-container'));
		expect(cardElement).toBeDefined();

		const cardNativeElement = cardElement.nativeElement as HTMLDivElement;
		expect(cardNativeElement.children.length).toBeGreaterThanOrEqual(2);
	}));

	test('should have chart container', () => {
		const chartElement = debugElement.query(By.css('div.chart-container'));
		expect(chartElement).toBeDefined();

		const chartNativeElement = chartElement.nativeElement as HTMLDivElement;
		expect(chartNativeElement.children.length).toBeGreaterThanOrEqual(2);
	});

	describe('Test Dashboard Component', () => {
		let testComponent: TestDashboardComponent;
		let testFixture: ComponentFixture<TestDashboardComponent>;
		let cardElement: DebugElement;
		let chartElement: DebugElement;

		beforeEach(() => {
			testFixture = TestBed.createComponent(TestDashboardComponent);
			testComponent = testFixture.componentInstance;
			cardElement = testFixture.debugElement.query(By.css('adm-card'));
			chartElement = testFixture.debugElement.query(By.css('adm-chart'));

			testFixture.detectChanges();
		});

		test('should have a card element', () => {
			expect(cardElement).toBeDefined();
			expect(cardElement.nativeElement.header).toEqual(testComponent.card.header);
		});

		test('should have a chart element', () => {
			expect(chartElement).toBeDefined();
			expect(chartElement.nativeElement.config.chartType).toEqual(testComponent.chart.chartType);
		});
	});
});
