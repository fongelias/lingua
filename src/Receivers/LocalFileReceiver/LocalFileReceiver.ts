import { IReceiver } from '../../Receivers';

export class LocalFileReceiver implements IReceiver {
	private fileName: string;

	constructor(fileName: string) {
		this.fileName = fileName;
	}
}