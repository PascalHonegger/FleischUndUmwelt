import { IFact } from './IFact';

export interface ISource {
    url: string;
    title: string;
    description: string;
    facts: IFact[];
}
