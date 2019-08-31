import { IView } from '@entities';
import {db} from '../../../models';

export interface IViewDao {
    View: any;

    getAll: () => Promise<IView[]>;
    getOne: (id: number) => Promise<IView>;
    add: (View: IView) => Promise<any>;
    update: (changes: any, id: number) => Promise<any>;
    delete: (id: number) => Promise<any>;
}

export class ViewDao implements IViewDao {
    
    View = db['View'];

    public async getAll(): Promise<IView[]> {
        return this.View.findAll();
    }

    public async getOne(id: number): Promise<any> {
        return this.View.findOne({where: {id: id}});
    }

    public async update(changes: any, id: number): Promise<any> {
        return this.View.update(changes, {
            where: {
              id: id,
            },
        });
    }

    public async add(view: IView): Promise<void> {
        return this.View.create(view, {
            fields: [
                'name', 
                'displayType',  
            ]
        })    
    }

    public async delete(id: number): Promise<void> {
        return this.View.update({isActive: false}, {
            where: {
                id: id,
            },
        });
    }
}
