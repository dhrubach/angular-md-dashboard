import * as Chartist from 'chartist';
import { ChartEvent } from 'ng-chartist';

interface IChartData {
	chartType: 'Line' | 'Bar' | 'Pie';
	data: Chartist.IChartistData;
	header: string;
	type: 'proposal' | 'accounts' | 'exception' | 'default';
}

class BaseChartComponent {
	public config: IChartData;
	protected event: ChartEvent;
	protected options: Chartist.ILineChartOptions | Chartist.IBarChartOptions | Chartist.IPieChartOptions;
}

export { BaseChartComponent, IChartData };
