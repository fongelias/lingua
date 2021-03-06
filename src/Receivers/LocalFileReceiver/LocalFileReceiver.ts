import { IReceiver } from '../../Receivers';
import { eventNames } from '../../Constants';

import * as EventEmitter from 'events';
import * as readline from 'readline';
import * as fs from 'fs';

export class LocalFileReceiver implements IReceiver {
	private fileName: string;
	private emitter: EventEmitter;

	constructor(fileName: string, emitter: EventEmitter) {
		this.fileName = fileName;
		this.emitter = emitter;
	}

	public receive() {
		const input = fs.createReadStream(this.fileName);
		const lineReader = readline.createInterface({ input });

		lineReader.on('line',  (line) => {
			this.emitter.emit(eventNames.receiverChunk, line);
		})

		lineReader.on('close', () => {
			this.emitter.emit(eventNames.receiverClosed);
			input.destroy();
		})
	}
}