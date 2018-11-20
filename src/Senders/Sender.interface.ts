import { IResultTemplate } from "../ResultTemplates";

export interface ISender {
    send(resultTemplate: IResultTemplate): void;
}