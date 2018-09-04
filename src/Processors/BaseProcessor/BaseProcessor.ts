import { 
	IProcessor,
	IPreProcessor,
	IPreProcessed,
	IStrategy, 
	IProcessed,
	IResultTemplate,
	eventNames 
} from '../../';

import * as EventEmitter from 'events';

export class BaseProcessor implements IProcessor {
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
		const preProcessed: IPreProcessed = this.preProcessor.transform(chunk);
		const processed: IProcessed = this.strategy.execute(preProcessed);
		return this.resultTemplate.fillWith(processed);	
	}
}
