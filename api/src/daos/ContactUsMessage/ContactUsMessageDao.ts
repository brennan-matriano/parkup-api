import { IContactUsMessage } from '@entities';
import {db} from '../../../models';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

export interface IContactUsMessageDao {
    ContactUsMessage: any;
    add: (Message: IContactUsMessage) => Promise<any>;
}

export class ContactUsMessageDao implements IContactUsMessageDao {
    
    ContactUsMessage = db['ContactUsMessage'];

    public async add(listing: IContactUsMessage): Promise<void> {
        return this.ContactUsMessage.create(listing, {
            fields: [
                'name', 
                'email', 
                'subject',
                'message'
            ]
        })    
    }
}