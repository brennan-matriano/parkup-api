
export interface IView {
    id?: number;
    name: string;
    displayType: string;
}

export class View implements IView {
    public id?: number;
    public name: string;
    displayType: string;
}
