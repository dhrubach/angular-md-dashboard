import { Component, DebugElement, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CardComponent, ICardData } from './card.component';

@Component({
	template: `
		<adm-card [content]="card.content" [header]="card.header"
				  [icon]="card.icon" [type]="card.type">
		</adm-card>
	`,
})
class TestHostComponent implements OnInit {

	public card: ICardData;

	public ngOnInit(): void {
		this.card = {
			content: 'test content',
			header: 'test header',
			icon: 'error',
			type: 'exception',
		};
	}
}

describe('CardComponent', () => {
	let fixture: ComponentFixture<CardComponent>;
	let de: DebugElement;
	let el: HTMLElement;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CardComponent, TestHostComponent],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CardComponent);
		de = fixture.debugElement.query(By.css('md-card.card-item'));
		el = de.nativeElement;

		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(de).toBeDefined();
		expect(el.nodeName).toEqual('MD-CARD');
	});

	describe('TestHostComponent', () => {
		let testHostFixture: ComponentFixture<TestHostComponent>;
		let testHostComponent;

		beforeEach(() => {
			testHostFixture = TestBed.createComponent(TestHostComponent);
			testHostComponent = testHostFixture.componentInstance;

			testHostFixture.detectChanges();
		});

		it('should be created', () => {
			expect(testHostComponent).toBeDefined();
		});

		it('should be initialized with correct bindings', () => {
			const cardInstance = testHostComponent.card;
			expect(cardInstance.content).toEqual('test content');
			expect(cardInstance.type).toEqual('exception');
		});
	});
});
