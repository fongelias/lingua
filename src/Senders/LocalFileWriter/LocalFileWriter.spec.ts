import * as assert from 'assert';
import * as EventEmitter from 'events';
import * as path from 'path';
import * as fs from 'fs';
import { eventNames } from '../../Constants';
import { IResultTemplate } from '../../ResultTemplates';

import { LocalFileWriter } from './LocalFileWriter';
import { IProcessed } from '../../Strategies';

describe('class LocalFileReceiver', () => {
	describe('#send', () => {
		it('should read a local file line-by-line, and emit to receiver.line', (done) => {
			//Test Variable
			let fakeFileName = "testFile.txt";
			//Set up Emitter
            const emitter = new EventEmitter();
            //Set up ResultTemplate
            const resultTemplate: IResultTemplate = {
                isFilled: () => true,
                fillWith: (processed: IProcessed) => void(0),
                data: "someTest",
            }
            //Set up Spies
            spyOn(fs, 'appendFile').and.stub();
			//Insert Emitter and run send()
			const sender = new LocalFileWriter(fakeFileName, emitter);
            sender.send(resultTemplate);
            //Test
            expect(fs.appendFile).toBeCalledWith(fakeFileName, resultTemplate.data, null);
            done();
		})
	})
})