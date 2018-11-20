import {
	IStrategy,
	IProcessed
} from '../../Strategies';
import {
	IPreProcessed
} from '../../PreProcessors';

export class BaseStrategy implements IStrategy {
	public execute(preProcessed: IPreProcessed): IProcessed {
		return {
			isProcessed: () => true,
			data: preProcessed.data
		}
	};
}