import { IUser } from '@entities';
import {db} from '../../../models';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

export interface IUserDao {
    User: any;

    getAll: () => Promise<IUser[]>;
    getOne: (id: number) => Promise<IUser>;
    getAllSimilarName: (query: string) => Promise<IUser[]>;
    add: (user: IUser) => Promise<any>;
    update: (changes: any, id: number) => Promise<any>;
    delete: (id: number) => Promise<any>;
}

export class UserDao implements IUserDao {
    
    User = db['User'];

    public async getAll(): Promise<IUser[]> {
        return this.User.findAll();
    }

    public async getAllSimilarName(query: string): Promise<IUser[]> {
        let tokens: string[] = query.split(' ');
        let conditions: any[] = [];
        for(let token of tokens){
            conditions.push({firstName: {[Op.like]:  '%' + token + '%'}});
            conditions.push({lastName: {[Op.like]:  '%' + token + '%'}});
        }
        return this.User.findAll({
            where:{
                [Op.or]:[
                    conditions
                ]
            }
        });
    }

    public async getOne(id: number): Promise<any> {
        return this.User.findOne({where: {id: id}});
    }

    public async update(changes: any, id: number): Promise<any> {
        return this.User.update(changes, {
            where: {
              id: id,
            },
            fields: {exclude: ['password', 'passwordResetToken', 'verified', 'createdAt', 'updatedAt']},
        });
    }

    public async add(user: IUser): Promise<void> {
        return this.User.create(user, {
            fields: [
                'id', 
                'firstName', 
                'lastName', 
                'password',
                'email'
            ]
        })    
    }

    public async delete(id: number): Promise<void> {
        return this.User.update({isActive: false}, {
            where: {
                id: id,
            },
            fields: {
                exclude: [
                'password', 
                'passwordResetToken', 
                'isVerified', 
                'createdAt', 
                'updatedAt'
                ]
            }
        }
        );
    }
}
