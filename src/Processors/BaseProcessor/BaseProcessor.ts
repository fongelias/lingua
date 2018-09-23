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
		this.connectPreProcessor();
	}

	private connectReceiver() {
		this.emitter.on(eventNames.receiverChunk, (chunk: string) => {
			this.preProcessor.transform(chunk);
		});
		this.emitter.on(eventNames.receiverClosed, () => {});
	}

	private connectPreProcessor() {
		this.emitter.on(eventNames.preProcessorChunk, (preProcessed: IPreProcessed) => {
			const processed: IProcessed = this.strategy.execute(preProcessed);
			const result: IResultTemplate = this.resultTemplate.fillWith(processed);
			this.emitter.emit(eventNames.processorResult, result);
		})
	}
}
