import { Route } from '@angular/router';

import {
	DashboardComponent,
	ExceptionsComponent,
	UploadComponent,
	UserComponent,
} from './components';

export const routes: Route[] = [
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'exception', component: ExceptionsComponent },
	{ path: 'upload', component: UploadComponent },
	{ path: 'user', component: UserComponent },
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
