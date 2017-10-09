import { IFact } from './IFact';

export class Fact implements IFact {
    public value: number;
    public description: string;

    constructor(value: number, description: (val: number) => string) {
        this.value = value;
        this.description = description(value);
    }
}
