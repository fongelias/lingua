import * as assert from 'assert';
import * as EventEmitter from 'events';

import { BasePreProcessor } from '../BasePreProcessor/BasePreProcessor';
import { IPreProcessed } from '../PreProcessor.interface';
import { WordInstanceExtractionPreProcessor } from './WordInstanceExtractionPreProcessor';


describe('class WordInstanceExtractionPreProcessor', () => {
	describe('#transform', () => {
		it('should find all correct instances of a word', (done) => {
			const emitter = new EventEmitter();
			const preProcessor = new WordInstanceExtractionPreProcessor(emitter);
			const testValue = "it\'s a test";
			let matchCounter = 0;
			emitter.on(BasePreProcessor.emissionEventName, (match: IPreProcessed) => {
				assert.equal(testValue.split(' ')[matchCounter], match.data);
				matchCounter++;
			});

			preProcessor.transform(testValue);
			
			setInterval(() => {
				assert.equal(matchCounter, 3);
				done();
			}, 100);
		})
	})
})