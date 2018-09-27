import * as assert from 'assert';
import * as EventEmitter from 'events';

import { BasePreProcessor } from '../BasePreProcessor/BasePreProcessor';
import { IPreProcessed } from '../PreProcessor.interface';
import { RegexInstanceExtractionPreProcessor } from './RegexInstanceExtractionPreProcessor';


describe('class RegexInstanceExtractionPreProcessor', () => {
	describe('#transform', () => {
		it('should only emit once per unique regex match', (done) => {
			const emitter = new EventEmitter();
			const preProcessor = new RegexInstanceExtractionPreProcessor(emitter, /./g)
			const testValue = "aa";
			let matchCounter = 0;
			emitter.on(BasePreProcessor.emissionEventName, (match: IPreProcessed) => {
				assert.equal(testValue.split('')[matchCounter], match.data);
				matchCounter++;
				setInterval(() => {
					assert.equal(1, matchCounter);
					done();
				}, 100);
			});
			preProcessor.transform(testValue);
		})
	})
})