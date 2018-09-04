export interface IPreProcessor {
	transform(chunk: string): IPreProcessed; 
}

export interface IPreProcessed {
	isPreProcessed(): boolean;
}