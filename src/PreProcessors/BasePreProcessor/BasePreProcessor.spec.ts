import * as assert from 'assert';
import * as EventEmitter from 'events';

import {
	IPreProcessed
} from '../../';

import { BasePreProcessor } from './BasePreProcessor';


describe('class BasePreProcessor', () => {
	describe('#transform', () => {
		it('should take a string chunk and return an object implementing IPreProcessed', (done) => {
			const emitter = new EventEmitter();
			const preProcessor = new BasePreProcessor(emitter);
			const testValue = "testValue";
			emitter.on(BasePreProcessor.emissionEventName, (preProcessed: IPreProcessed) => {
				assert(preProcessed.isPreProcessed());
				assert.equal(testValue, preProcessed.data);
				done();
			});
			preProcessor.transform(testValue);
			
		})
	})
})

