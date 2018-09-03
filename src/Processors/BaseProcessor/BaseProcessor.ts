import { IProcessor } from '../../Processors';
import { IPreProcessor } from '../../PreProcessors';
import { IStrategy } from '../../Strategies';
import { IResultTemplate } from '../../ResultTemplates';

export class BaseProcessor implements IProcessor {
	private preProcessor: IPreProcessor;
	private strategy: IStrategy;
	private resultTemplate: IResultTemplate;

	constructor(preProcessor: IPreProcessor, strategy: IStrategy, resultTemplate: IResultTemplate) {
		this.preProcessor = preProcessor;
		this.strategy = strategy;
		this.resultTemplate = resultTemplate;
	}
}
