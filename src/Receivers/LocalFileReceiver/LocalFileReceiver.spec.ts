import * as assert from 'assert';
import { LocalFileReceiver } from './LocalFileReceiver';
import * as EventEmitter from 'events';
import * as path from 'path';

const config = {
	testFileName: path.resolve('./src/Receivers/LocalFileReceiver/testFile.txt'), //Resolves relative to project root
}

describe('class LocalFileReceiver', () => {
	describe('#receive', () => {
		it('should read a local file line-by-line', (done) => {
			//Test Variable
			let linesRead = 0;
			//Set up Emitter
			const emitter = new EventEmitter();
			emitter.on('receiver.close', () => { 
				assert.equal(linesRead, 3);
				done();
			});
			emitter.on('receiver.line', () => { linesRead++ });
			//Insert Emitter and run receiver()
			const receiver = new LocalFileReceiver(config.testFileName, emitter);
			receiver.receive();
		})
	})
})