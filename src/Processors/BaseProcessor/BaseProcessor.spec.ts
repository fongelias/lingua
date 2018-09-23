import * as assert from 'assert';
import * as EventEmitter from 'events';

import {
	eventNames,
	IProcessed,
	IPreProcessor,
	IPreProcessed,
	IStrategy,
	IResultTemplate,
} from '../../';

import { BaseProcessor } from './BaseProcessor';

//Mock Interfaces
interface IMockProcessed extends IProcessed {
	data: string;
}

interface IMockResultTemplate extends IResultTemplate {
	data: string;
}


describe('class BaseProcessor', () => {
	describe('#constructor', () => {
		const testEventEmitter: EventEmitter = new EventEmitter();
		const mockPreProcessor: IPreProcessor = {
			transform: (chunk: string):void => {
				testEventEmitter.emit(eventNames.preProcessorChunk, {
					isPreProcessed: () => true,
					data: chunk,
				});
			}
		};
		const mockStrategy: IStrategy = {
			execute: (preProcessed: IPreProcessed): IMockProcessed => {
				return {
					isProcessed: () => true,
					data: preProcessed.data,
				}
			}
		};
		const mockResultTemplate: IMockResultTemplate = {
			fillWith: (processed: IMockProcessed): IMockResultTemplate => {
				this.data = processed.data;
				return this;
			},
			isFilled: (): boolean => !!this.data,
			data: ""
		};


		it('should take a Receiver input and emit results to the passed eventEmitter', (done) => {
			const processor = new BaseProcessor(mockPreProcessor, mockStrategy, mockResultTemplate, testEventEmitter);
			const testValue = "testValue";
			testEventEmitter.on(eventNames.processorResult, (result: IMockResultTemplate) => {
				assert.equal(result.data, testValue);
				done();
			});
			testEventEmitter.emit(eventNames.receiverChunk, testValue);
		});

		it('should emit multiple results per Receiver input based on the PreProcessor', (done) => {
			//Processor that emits the input twice
			const mockDoublePreProcessor: IPreProcessor = {
				transform: (chunk: string):void => {
					testEventEmitter.emit(eventNames.preProcessorChunk, {
						isPreProcessed: () => true,
						data: chunk,
					});
					testEventEmitter.emit(eventNames.preProcessorChunk, {
						isPreProcessed: () => true,
						data: chunk,
					});
				}
			};

			const processor = new BaseProcessor(mockPreProcessor, mockStrategy, mockResultTemplate, testEventEmitter);
			const testValue = "testValue";
			let callCount = 0;
			testEventEmitter.on(eventNames.processorResult, (result: IMockResultTemplate) => {
				if(result.data === testValue) {
					callCount++;
				};
				if(callCount === 2) {
					done();
				}
			});
			testEventEmitter.emit(eventNames.receiverChunk, testValue);
		});
	})
})

