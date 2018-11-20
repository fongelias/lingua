import { ISender } from '../../Senders';
import { eventNames } from '../../Constants';

import * as EventEmitter from 'events';
import * as readline from 'readline';
import * as fs from 'fs';
import { IResultTemplate } from '../../ResultTemplates';

export class LocalFileWriter implements ISender {
	private fileName: string;

	constructor(fileName: string, emitter: EventEmitter) {
		this.fileName = fileName;
        
        emitter.on(eventNames.processorResult, this.send)
	}

	public send(resultTemplate: IResultTemplate) {
		fs.appendFile(this.fileName, resultTemplate.data, null);
	}
}