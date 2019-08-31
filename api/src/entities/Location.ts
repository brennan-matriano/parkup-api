
export interface ILocation {
    id?: number;
    name: string;
    maxCapacity: number;
    description: string;
}

export class Location implements ILocation {
    public id?: number;
    public name: string;
    public maxCapacity: number;
    public description: string;
}
