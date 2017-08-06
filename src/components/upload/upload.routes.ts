import { UploadComponent } from './upload.component';

// tslint:disable:object-literal-sort-keys
export const routes = [
	{
		path: '', children: [
			{ path: '', component: UploadComponent },
		],
	},
];
