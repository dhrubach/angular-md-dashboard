import { Route } from '@angular/router';

import {
	DashboardComponent,
	ExceptionsComponent,
} from './components';

export const routes: Route[] = [
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'exception', component: ExceptionsComponent },
	{ path: 'upload', loadChildren: './components/upload#UploadModule' },
	{ path: 'user', loadChildren: './components/users#UsersModule' },
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
