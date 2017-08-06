import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup, NgForm } from '@angular/forms';

import * as moment from 'moment';

import { ILogo, UploadDataService } from './upload.service';

@Component({
	providers: [UploadDataService],
	selector: 'adm-upload',
	styles: [require('./upload.component.scss')],
	template: require('./upload.template.html'),
})
export class UploadComponent implements OnInit {

	private logos: ILogo[];
	private newLogo;
	private showPreviewBlock: boolean;
	private uploadedFile: File;

	@ViewChild('uploadForm') private uploadForm: NgForm;

	constructor(private uploadService: UploadDataService) { }

	public ngOnInit(): void {
		this.resetTemplateState();
		this.fetchGridData();
	}

	private archive(logo: ILogo): void {
		logo.status = 'disable';
		setTimeout(() => {
			if (this.uploadService.markAsArchived(logo.id)) {
				this.fetchGridData();
			}
		}, 1000);
	}

	private fetchGridData(): void {
		this.logos = this.uploadService.getData()
			.filter((logo) => logo.status === 'active');
	}

	private resetTemplateState(): void {
		this.newLogo = {
			description: '',
			logNumber: '',
			logoName: '',
			provider: '',
			purpose: '',
			url: '',
		};

		const currentFormGroup = this.uploadForm.form;
		if (currentFormGroup && currentFormGroup.controls) {
			Object.keys(currentFormGroup.controls).forEach((controlName) => {
				const control: AbstractControl = currentFormGroup.controls[controlName];
				if (control) {
					control.reset('');
				}
			});
		}

		this.showPreviewBlock = false;
	}

	private save(): void {
		this.newLogo.status = 'active';
		this.newLogo.update = moment().format('MM/DD/YYYY');

		this.uploadService.saveData(this.newLogo);
		this.fetchGridData();
		this.resetTemplateState();
	}

	private showImagePreview(event: Event): void {
		const uploadedFiles = (event.target as any).files as FileList;
		if (uploadedFiles && uploadedFiles.length) {
			this.uploadedFile = uploadedFiles[0];

			if (this.uploadedFile && this.uploadedFile.size) {
				const reader = new FileReader();
				reader.onload = (evt: Event) => {
					this.newLogo.url = (evt.target as any).result;
					this.showPreviewBlock = true;
				};
				reader.readAsDataURL(this.uploadedFile);
			}
		}
	}

	private update(name: string, index: number): void {
		this.uploadService.updateData(name, index);
	}

}
