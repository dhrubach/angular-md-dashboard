import { Component } from '@angular/core';

import { ArchiveComponent } from './archive/archive.component';
import { ILogo, UploadDataService } from './upload.service';

@Component({
	providers: [UploadDataService],
	selector: 'adm-upload',
	styles: [require('./upload.component.scss')],
	template: require('./upload.template.html'),
})
export class UploadComponent {

	private logo: ILogo[];

	constructor(private uploadService: UploadDataService) {
		this.logo = this.uploadService.getData();
	}

	private save(data, index): void {
		data.edit = true;
		this.uploadService.saveData(data);
	}

}
