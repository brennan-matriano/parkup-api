import { ILocation } from '@entities';
import {db} from '../../../models';

export interface ILocationDao {
    Location: any;

    getAll: () => Promise<ILocation[]>;
    getOne: (id: number) => Promise<ILocation>;
    add: (Location: ILocation) => Promise<any>;
    update: (changes: any, id: number) => Promise<any>;
    delete: (id: number) => Promise<any>;
}

export class LocationDao implements ILocationDao {
    
    Location = db['Location'];

    public async getAll(): Promise<ILocation[]> {
        return this.Location.findAll();
    }

    public async getOne(id: number): Promise<any> {
        return this.Location.findOne({where: {id: id}});
    }

    public async update(changes: any, id: number): Promise<any> {
        return this.Location.update(changes, {
            where: {
              id: id,
            },
        });
    }

    public async add(location: ILocation): Promise<void> {
        return this.Location.create(location, {
            fields: [
                'name', 
                'maxCapacity', 
                'description', 
            ]
        })    
    }

    public async delete(id: number): Promise<void> {
        return this.Location.update({isActive: false}, {
            where: {
                id: id,
            },
            fields: {
                exclude: [ 
                'createdAt', 
                'updatedAt'
                ]
            }
        }
        );
    }
}
