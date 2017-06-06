import { Route } from '@angular/router';

import {
	DashboardComponent,
	ExceptionsComponent,
	SettingsComponent,
	UserComponent,
} from './components';

export const routes: Route[] = [
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'exception', component: ExceptionsComponent },
	{ path: 'settings', component: SettingsComponent },
	{ path: 'user', component: UserComponent },
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
