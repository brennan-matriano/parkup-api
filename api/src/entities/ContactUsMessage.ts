
export interface IContactUsMessage {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export class ContactUsMessage implements IContactUsMessage {
    public name: string;
    public email: string;
    public subject: string;
    public message: string;
}
