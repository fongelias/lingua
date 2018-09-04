import { IProcessed } from '../Strategies';


export interface IResultTemplate {
	isFilled(): boolean;
	fillWith(processed: IProcessed): this;
}