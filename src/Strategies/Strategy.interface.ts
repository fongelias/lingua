import { IPreProcessed } from '../PreProcessors';


export interface IStrategy {
	execute(preProcessed: IPreProcessed): IProcessed;
}

export interface IProcessed {
	isProcessed(): boolean;
}