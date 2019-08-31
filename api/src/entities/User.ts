
export interface IUser {
    id?: number;
    firstName: string;
    lastName: string;    
    email: string;
    password: string;
}

export class User implements IUser {

    public id?: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;

}
