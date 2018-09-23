import * as EventEmitter from 'events';
import { eventNames } from '../../Constants';
import { IPreProcessor } from '../PreProcessor.interface';


export class BasePreProcessor implements IPreProcessor {
	public static emissionEventName: string = eventNames.preProcessorChunk;

	constructor(protected emitter: EventEmitter) {}

	public transform(chunk: string):void {
		this.emitter.emit(BasePreProcessor.emissionEventName, {
			isPreProcessed: () => true,
			data: chunk,
		});
	}
}