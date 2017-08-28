import { UserDataService } from './users.service';

describe('UserDataService', () => {
	let userDataService;

	beforeEach(() => {
		userDataService = new UserDataService();
	});

	it('should have user list', () => {
		expect(userDataService.data.length).toBe(15);
	});

	it('should return NULL when refreshData is called with invalid user', () => {
		const returnValue = userDataService.refreshData('invalid user');
		expect(returnValue).toBeNull();
	});

	it('should return object when refreshData is called with valid user', () => {
		const { remaining, status} = userDataService.refreshData('PFS01');
		expect(status).toEqual('online');
	});

	it('should check for generated time difference to return "-"', () => {
		const expires = '08/28/2017 09:38:13';
		const access = '08/28/2017 09:38:13';
		const returnData = userDataService.generateFormattedTimeDifference(expires, access);
		expect(returnData).toBe('-');
	});

	it('should check for generated time difference to return diffrence value', () => {
		const expires = '06/21/2017 09:45:23';
		const access = '06/21/2017 09:31:51';
		const returnData = userDataService.generateFormattedTimeDifference(expires, access);
		expect(returnData).toBe('13:32');
	});
});
