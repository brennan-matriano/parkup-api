import { IReservation } from '@entities';
import {db} from '../../../models';

export interface IReservationDao {
    Reservation: any;

    getAll: () => Promise<IReservation[]>;
    getOne: (id: number) => Promise<IReservation>;
    add: (Reservation: IReservation) => Promise<any>;
    update: (changes: any, id: number) => Promise<any>;
    getAllForListing: (id: number) => Promise<IReservation[]>;
    getAllDatesForListing: (id: number) => Promise<String[]>;
}

export class ReservationDao implements IReservationDao {
    
    Reservation = db['Reservation'];

    public async getAll(): Promise<IReservation[]> {
        return this.Reservation.findAll();
    }

    public async getAllAvailable(): Promise<IReservation[]> {
        return this.Reservation.findAll({where: {isActive: true}});
    }

    public async getAllUnavailable(): Promise<IReservation[]> {
        return this.Reservation.findAll({where: {isActive: false}});
    }

    public async getOne(id: number): Promise<any> {
        return this.Reservation.findOne({where: {id: id}});
    }

    public async getAllForListing(id: number): Promise<any> {
        return this.Reservation.findAll({where: {ListingId: id}});
    }

    public async getAllDatesForListing(id: number): Promise<any> {
        return this.Reservation.findAll({
            attributes: ['startDate','endDate'],
            where: {ListingId: id}});
    }

    public async update(changes: any, id: number): Promise<any> {
        return this.Reservation.update(changes, {
            where: {
              id: id,
            },
        });
    }

    public async add(listing: IReservation): Promise<void> {
        return this.Reservation.create(listing, {
            fields: [
                'startDate',
                'endDate',
                'isAccepted',
                'price',
                'UserId',
                'ListingId'
            ]
        })    
    }
}
