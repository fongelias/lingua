import * as EventEmitter from 'events';
import { IPreProcessed } from '../PreProcessor.interface';


import { BasePreProcessor } from '../BasePreProcessor/BasePreProcessor';

export class RegexExtractionPreProcessor extends BasePreProcessor {
	constructor(emitter: EventEmitter, private regex: RegExp) {
		super(emitter);
	}

	public transform(chunk: string): void {
		chunk.match(this.regex).forEach((match: string) => {
			this.onExtraction(match);
		})
	}

	private onExtraction(match: string): void {
		this.emitter.emit(BasePreProcessor.emissionEventName, this.buildPreProcessed(match));
	}

	private buildPreProcessed(match: string): IPreProcessed {
		return {
			isPreProcessed: () => true,
			data: match,
		}
	}
}