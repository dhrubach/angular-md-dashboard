import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AgGridModule } from 'ag-grid-angular';

import { UserComponent } from './users.component';
import { UsersModule } from './users.module';
import { IUser, UserDataService } from './users.service';

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

		de = fixture.debugElement.query(By.css('div.user-grid-container'));
		el = de.nativeElement;
	});

	it('should create user component', async () => {
		expect(comp).toBeTruthy();
	});

	describe('User Grid', () => {
		it('should have column definition object', () => {
			expect(comp.columnDefs).toBeTruthy();
			expect(comp.columnDefs.length).toEqual(6);
		});
	});

	it('should have a pagination component', () => {
		expect(comp.paginationComponent.constructor.name).toBe('GridPaginationComponent');
	});

	it('should return number of online users', () => {
		const users: IUser[] = [
			{
				access: '08/28/2017 09:38:01',
				created: '08/28/2017 09:23:13',
				expires: '08/28/2017 09:38:13',
				remaining: '',
				status: 'online',
				user: 'TEST1',
			},
		];
		comp.getOnlineUsers(users);
		expect(comp.onlineUsers).toEqual(1);

		users[0].status = 'orphan';
		comp.getOnlineUsers(users);
		expect(comp.onlineUsers).toEqual(0);

		comp.getOnlineUsers([]);
		expect(comp.onlineUsers).toEqual(0);
	});
});
