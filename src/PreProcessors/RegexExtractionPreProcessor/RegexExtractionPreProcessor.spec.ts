import * as assert from 'assert';
import * as EventEmitter from 'events';

import { BasePreProcessor } from '../BasePreProcessor/BasePreProcessor';
import { IPreProcessed } from '../PreProcessor.interface';

import { RegexExtractionPreProcessor } from './RegexExtractionPreProcessor';

describe('class RegexExtractionPreProcessor', () => {
	describe('#transform', () => {
		it('should return matches based on regex', (done) => {
			const emitter = new EventEmitter();
			const preProcessor = new RegexExtractionPreProcessor(emitter, /\w+/g);
			const testValue = "test value";
			let matchCounter = 0;
			emitter.on(BasePreProcessor.emissionEventName, (match: IPreProcessed) => {
				assert.equal(testValue.split(' ')[matchCounter], match.data);
				if(matchCounter === 1) {
					done();
				}
				matchCounter++;
			});
			preProcessor.transform(testValue);
		})
	})
})