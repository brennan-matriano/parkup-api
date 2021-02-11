import { IListing, IUser } from '@entities';
import {db} from '../../../models';
import { UserDao, IUserDao } from '../User/UserDao';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

export interface IListingDao {
    Listing: any;

    getAll: () => Promise<IListing[]>;
    getAllAvailable: () => Promise<IListing[]>;
    getAllUnavailable: () => Promise<IListing[]>;
    search: (query: ListingSearchObject) => Promise<IListing[]>;
    getOne: (id: number) => Promise<IListing>;
    add: (Listing: IListing) => Promise<any>;
    update: (changes: any, id: number) => Promise<any>;
    delete: (id: number) => Promise<any>;
    getUnavailableDates: (id: number) => Promise<Date[]>;
}

export interface ListingSearchObject {
    description?: string;
    owner?: string;

    // Price Per Hour
    pphLowerLimit?: number;
    pphUpperLimit?: number;
    
    isActiveOnly?: boolean;
    isInactiveOnly?: boolean;

    timeAvailabilityStart?: Date;
    timeAvailabilityEnd?: Date;

    dateAvailabilityStart?: Date;
    dateAvailabilityEnd?: Date;
}

export class ListingDao implements IListingDao {
    
    Listing = db['Listing'];

    public async getAll(): Promise<IListing[]> {
        return this.Listing.findAll();
    }

    public async getUnavailableDates(): Promise<Date[]>{
        return null;
    }

    public async getAllAvailable(): Promise<IListing[]> {
        return this.Listing.findAll({where: {isActive: true}});
    }

    public async getAllUnavailable(): Promise<IListing[]> {
        return this.Listing.findAll({where: {isActive: false}});
    }

    public async search(query: ListingSearchObject): Promise<IListing[]> {
        let conditions: any[] = [];
        if(query.description){
            let descriptionConditions = [];
            let tokens: string[] = query.description.split(' ');
            for (let token of tokens){
                descriptionConditions.push({description: {[Op.like]: '%'+ token + '%'}});
            }
            conditions.push({[Op.or]:[descriptionConditions]});
        }
        if(query.owner){
            let Users: IUserDao = new UserDao();
            let ownerConditions: any = [];
            let similarUsers: IUser[] = await Users.getAllSimilarName(query.owner);
            for (let user of similarUsers){
                ownerConditions.push({owner: user.id});
            }
            conditions.push({[Op.or]:[ownerConditions]});
        }
        if(query.pphLowerLimit){
            conditions.push({pricePerHour: {[Op.gte]: query.pphLowerLimit}});
        }
        if(query.pphUpperLimit){
            conditions.push({pricePerHour: {[Op.lte]: query.pphUpperLimit}});
        }
        if(query.timeAvailabilityStart){
            conditions.push({timeAvailabilityStart: {[Op.lte]: query.timeAvailabilityStart}});
        }
        if(query.timeAvailabilityEnd){
            conditions.push({timeAvailabilityEnd: {[Op.gte]: query.timeAvailabilityEnd}});
        }
        if(query.dateAvailabilityStart){
            conditions.push({timeAvailabilityStart: {[Op.lte]: query.dateAvailabilityStart}});
        }
        if(query.dateAvailabilityStart){
            conditions.push({timeAvailabilityEnd: {[Op.gte]: query.dateAvailabilityEnd}});
        }
        
        if(query.isActiveOnly===true){
            conditions.push({isActive: true});
        }
        else if (query.isActiveOnly===false){
            conditions.push({isActive: false});
        }

        let ORMQuery: any = {where: {[Op.and]:[conditions]}};
        return this.Listing.findAll(ORMQuery);
    }

    public async getOne(id: number): Promise<IListing> {
        return this.Listing.findOne({where: {id: id}, include: [db['User']]});
    }

    public async getAllForUser(id: number): Promise<IListing[]>{
        return this.Listing.findAll({where: {UserId: id}});
    }

    public async update(changes: any, id: number): Promise<any> {
        return this.Listing.update(changes, {
            where: {
              id: id,
            },
        });
    }

    public async add(listing: IListing): Promise<void> {
        return this.Listing.create(listing, {
            fields: [
                'description', 
                'owner', 
                'pricePerHour',
                'isActive',
                'timeAvailabilityStart',
                'timeAvailabilityEnd',
                'dateAvailabilityStart',
                'dateAvailabilityEnd',
                'address',
                "location",
                "dailyRate",
                "propertyType",
                "landmarks",
                "requireApproval",
                "UserId",
                "imagePath",
                "title"
            ]
        })    
    }

    public async delete(id: number): Promise<void> {
        return this.Listing.update({isActive: false}, {
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
