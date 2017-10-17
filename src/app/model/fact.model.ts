export class Fact {
    public description: string;

    constructor(public readonly value: number, description: (val: number) => string) {
        this.description = description(value);
    }
}
