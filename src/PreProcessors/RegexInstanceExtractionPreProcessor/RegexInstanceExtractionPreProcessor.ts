import * as EventEmitter from 'events';

import { BasePreProcessor } from '../BasePreProcessor/BasePreProcessor';
import { RegexExtractionPreProcessor } from '../RegexExtractionPreProcessor/RegexExtractionPreProcessor';

export class RegexInstanceExtractionPreProcessor extends RegexExtractionPreProcessor {
	private matchMemo: any = {};

	constructor(emitter: EventEmitter, regex: RegExp) {
		super(emitter, regex); //remove the regex here and move it to the extended class
	}

	public transform(chunk: string): void {
		chunk.match(this.regex).forEach((match: string) => {
			this.memoizedOnExtraction(match);
		})
	}

	protected memoizedOnExtraction(match: string): void {
		if(this.matchMemo[match]) {
			this.onExtraction(match);
		}
		this.matchMemo[match] = true;
	}
}