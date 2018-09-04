import { IProcessor } from '../../Processors';
import { IPreProcessor } from '../../PreProcessors';
import { IStrategy } from '../../Strategies';
import { IResultTemplate } from '../../ResultTemplates';
import { eventNames } from '../../Constants';

import * as EventEmitter from 'events';

export class BaseProcessor<IResultTemplate> implements IProcessor {
	private preProcessor: IPreProcessor;
	private strategy: IStrategy;
	private resultTemplate: IResultTemplate;
	private emitter: EventEmitter;

	constructor(
		preProcessor: IPreProcessor, 
		strategy: IStrategy, 
		resultTemplate: IResultTemplate,
		emitter: EventEmitter
	) {
		this.preProcessor = preProcessor;
		this.strategy = strategy;
		this.resultTemplate = resultTemplate;
		this.emitter = emitter;
		//setup
		this.connectReceiver();
	}

	private connectReceiver() {
		this.emitter.on(eventNames.receiverChunk, (chunk: string) => {
			const result = this.process(chunk);
			this.emitter.emit(eventNames.processorResult, result);
		});
		this.emitter.on(eventNames.receiverClosed, () => {});
	}

	private process(chunk: string): IResultTemplate {
		const preProcessed = this.preProcessor.transform(chunk);
		const processed = this.strategy.execute(preProcessed);
		return this.resultTemplate.fillWith(processed);	
	}
}
