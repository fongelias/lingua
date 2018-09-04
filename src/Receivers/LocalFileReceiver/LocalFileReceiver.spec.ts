import * as assert from 'assert';
import * as EventEmitter from 'events';
import * as path from 'path';
import { eventNames } from '../../Constants';

import { LocalFileReceiver } from './LocalFileReceiver';

const config = {
	testFileName: path.resolve('./src/Receivers/LocalFileReceiver/testFile.txt'), //Resolves relative to project root
}

describe('class LocalFileReceiver', () => {
	describe('#receive', () => {
		it('should read a local file line-by-line, and emit to receiver.line', (done) => {
			//Test Variable
			let linesRead = 0;
			//Set up Emitter
			const emitter = new EventEmitter();
			emitter.on(eventNames.receiverClosed, () => { 
				assert.equal(linesRead, 3);
				done();
			});
			emitter.on(eventNames.receiverChunk, () => { linesRead++ });
			//Insert Emitter and run receiver()
			const receiver = new LocalFileReceiver(config.testFileName, emitter);
			receiver.receive();
		})
	})
})