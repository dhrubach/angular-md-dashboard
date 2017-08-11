import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

describe('MainComponent', () => {
	let fixture;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AppComponent],
			imports: [
				NoopAnimationsModule,
			],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AppComponent);
		fixture.detectChanges();
	});

	it('should create the app', async(() => {
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));

});
