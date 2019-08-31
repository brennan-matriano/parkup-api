
export interface ISection {
    id?: number;
    name: string;
    maxCapacity: number;
    description: string;
}

export class Section implements ISection {
    public id?: number;
    public name: string;
    public maxCapacity: number;
    public description: string;
}
