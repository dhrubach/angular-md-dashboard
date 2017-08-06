import { Component, EventEmitter, Input, Output } from '@angular/core';

interface IPagination {
	currentPage: number;
	pageSize: number;
	totalPage: number;
	totalRecords: number;
}

enum PaginationActionType {
	'first',
	'previous',
	'next',
	'last',
}

@Component({
	selector: 'grid-pagination',
	styles: [require('./grid-pagination.component.scss')],
	template: require('./grid-pagination.template.html'),
})
class GridPaginationComponent {
	@Output() public onActionButtonClick: EventEmitter<string>;

	private disableFirstAndPrevious: boolean;
	private disableNextAndLast: boolean;
	private lastIndex: number;
	private startIndex: number;
	private totalRecords: number;
	private currentPage: number;
	private totalPage: number;

	constructor() {
		this.disableFirstAndPrevious = false;
		this.disableNextAndLast = false;
		this.onActionButtonClick = new EventEmitter();
	}

	public setActionButtonState(config: IPagination): void {
		const { currentPage, pageSize, totalPage, totalRecords } = config;
		const isLastPage = currentPage + 1 === totalPage;
		const singlePageToDisplay = isLastPage && currentPage === (totalPage - 1);

		this.disableFirstAndPrevious = currentPage === 0;
		this.disableNextAndLast = singlePageToDisplay || isLastPage;
	}

	public setPageLabels(config: IPagination): void {
		const { currentPage, pageSize, totalPage, totalRecords } = config;
		const isLastPage = currentPage + 1 === totalPage;

		this.startIndex = currentPage === 0 ? 1 : (currentPage * pageSize) + 1;
		this.lastIndex = isLastPage ? totalRecords : (this.startIndex + pageSize - 1);
		this.totalRecords = totalRecords;
		this.currentPage = currentPage;
		this.totalPage = totalPage;
	}

	private refreshPageView(buttonType: PaginationActionType): void {
		this.onActionButtonClick.emit(PaginationActionType[buttonType]);
	}
}

export { GridPaginationComponent, IPagination, PaginationActionType };
