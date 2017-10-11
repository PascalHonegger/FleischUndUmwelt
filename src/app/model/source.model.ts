import { Fact } from './fact.model';

export interface Source {
    url: string;
    title: string;
    description: string;
    facts: Fact[];
}
