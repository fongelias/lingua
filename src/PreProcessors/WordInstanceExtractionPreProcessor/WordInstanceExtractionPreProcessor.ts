import * as EventEmitter from 'events';

import { BasePreProcessor } from '../BasePreProcessor/BasePreProcessor';
import { RegexInstanceExtractionPreProcessor } from '../RegexInstanceExtractionPreProcessor/RegexInstanceExtractionPreProcessor';

export class WordInstanceExtractionPreProcessor extends RegexInstanceExtractionPreProcessor {

	constructor(emitter: EventEmitter) {
		super(emitter, /\w+[-']?\w*/g);
	}
}