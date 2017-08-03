import { Injectable } from '@angular/core';

interface ILogo {
	id: number;
	logoName: string;
	status: 'active' | 'disable' | 'archive';
	update: string;
	url: string;
}

@Injectable()
class UploadDataService {

	private imagesData: ILogo[];

	constructor() {
		this.imagesData = [
			{
				id: 1,
				logoName: 'Primerica',
				status: 'active',
				update: '08/01/2017',
				url: require('../../assets/logo/logo-1.jpg'),
			},
			{
				id: 2,
				logoName: 'Meeder',
				status: 'active',
				update: '08/01/2017',
				url: require('../../assets/logo/logo-2.jpg'),
			},
			{
				id: 3,
				logoName: 'Horizon Investments',
				status: 'archive',
				update: '08/01/2017',
				url: require('../../assets/logo/logo-4.png'),
			},
			{
				id: 4,
				logoName: 'LockWood Advisors',
				status: 'active',
				update: '08/01/2017',
				url: require('../../assets/logo/logo-5.jpg'),
			},
			{
				id: 5,
				logoName: 'Morning Star',
				status: 'active',
				update: '08/01/2017',
				url: require('../../assets/logo/logo-6.jpg'),
			},
			{
				id: 6,
				logoName: 'Invesco',
				status: 'archive',
				update: '08/01/2017',
				url: require('../../assets/logo/logo-7.png'),
			},
			{
				id: 7,
				logoName: 'Sage',
				status: 'active',
				update: '08/01/2017',
				url: require('../../assets/logo/logo-8.jpg'),
			},
			{
				id: 8,
				logoName: 'Horizon Investments',
				status: 'archive',
				update: '08/01/2017',
				url: require('../../assets/logo/logo-4.png'),
			},
			{
				id: 9,
				logoName: 'Sage',
				status: 'active',
				update: '08/01/2017',
				url: require('../../assets/logo/logo-8.jpg'),
			},
			{
				id: 10,
				logoName: 'Horizon Investments',
				status: 'archive',
				update: '08/01/2017',
				url: require('../../assets/logo/logo-4.png'),
			},
			{
				id: 11,
				logoName: 'LockWood Advisors',
				status: 'active',
				update: '08/01/2017',
				url: require('../../assets/logo/logo-5.jpg'),
			},
			{
				id: 12,
				logoName: 'Primerica',
				status: 'active',
				update: '08/01/2017',
				url: require('../../assets/logo/logo-1.jpg'),
			},
			{
				id: 13,
				logoName: 'Sage',
				status: 'active',
				update: '08/01/2017',
				url: require('../../assets/logo/logo-8.jpg'),
			},
			{
				id: 14,
				logoName: 'LockWood Advisors',
				status: 'active',
				update: '08/01/2017',
				url: require('../../assets/logo/logo-5.jpg'),
			},
			{
				id: 15,
				logoName: 'Primerica',
				status: 'active',
				update: '08/01/2017',
				url: require('../../assets/logo/logo-1.jpg'),
			},
		];
	}

	public getData(): ILogo[] {
		return this.imagesData;
	}

	public markAsArchived(id: number): boolean {
		const logo = this.imagesData.find((image) => image.id === id);
		if (logo) {
			logo.status = 'archive';
			return true;
		}
		return false;
	}

	public saveData(newData) {
		this.imagesData = newData;
	}
}

export { ILogo, UploadDataService };
