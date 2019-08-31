
export interface IReservation {
    id?: number
    startDate: Date;
    endDate: Date;
    isAccepted?: boolean;
    price: number;
    UserId: number;
    ListingId: number;
}

export class Reservation implements IReservation {
    public id?: number
    public startDate: Date;
    public endDate: Date;
    public isAccepted?: boolean;
    public price: number;
    public UserId: number;
    public ListingId: number;
}
