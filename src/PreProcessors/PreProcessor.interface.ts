export interface IPreProcessor {
	transform(chunk: string): void; // should emit IPreProcessed
}

export interface IPreProcessed {
	isPreProcessed(): boolean;
	data: any;
}
