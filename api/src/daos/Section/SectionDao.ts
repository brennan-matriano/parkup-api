import { ISection } from '@entities';
import {db} from '../../../models';

export interface ISectionDao {
    Section: any;

    getAll: () => Promise<ISection[]>;
    getOne: (id: number) => Promise<ISection>;
    add: (Section: ISection) => Promise<any>;
    update: (changes: any, id: number) => Promise<any>;
    delete: (id: number) => Promise<any>;
}

export class SectionDao implements ISectionDao {
    
    Section = db['Section'];

    public async getAll(): Promise<ISection[]> {
        return this.Section.findAll();
    }

    public async getOne(id: number): Promise<any> {
        return this.Section.findOne({where: {id: id}});
    }

    public async update(changes: any, id: number): Promise<any> {
        return this.Section.update(changes, {
            where: {
              id: id,
            },
        });
    }

    public async add(section: ISection): Promise<void> {
        return this.Section.create(section, {
            fields: [
                'name', 
                'maxCapacity', 
                'description', 
            ]
        })    
    }

    public async delete(id: number): Promise<void> {
        return this.Section.update({isActive: false}, {
            where: {
                id: id,
            },
        });
    }
}
