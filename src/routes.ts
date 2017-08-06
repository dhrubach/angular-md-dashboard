import { Route } from '@angular/router';

import { DashboardComponent } from './app';

export const routes: Route[] = [
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'exception', loadChildren: './app/exceptions#ExceptionsModule' },
	{ path: 'upload', loadChildren: './app/upload#UploadModule' },
	{ path: 'user', loadChildren: './app/users#UsersModule' },
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
