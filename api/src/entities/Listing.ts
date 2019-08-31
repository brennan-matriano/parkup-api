
export interface IListing {
    id?: number;
    description: string;
    title: string;
    owner: number;
    pricePerHour?: number;
    isActive: boolean;
    timeAvailabilityStart: Date;
    dateAvailabilityStart: Date;
    timeAvailabilityEnd: Date;
    dateAvailabilityEnd: Date;
    UserId: number;
    dailyRate: number;
    landmarks: string;
    requireApproval: boolean;
    propertyType: string;
    address: string;
    imagePath: string;
}

export class Listing implements IListing {
    public id?: number;
    public description: string;
    public owner: number;
    public title: string;
    public pricePerHour: number;
    public isActive: boolean;
    public timeAvailabilityStart: Date;
    public dateAvailabilityStart: Date;
    public timeAvailabilityEnd: Date;
    public dateAvailabilityEnd: Date;
    public UserId: number;
    public dailyRate: number;
    public landmarks: string;
    public requireApproval: boolean;
    public propertyType: string;
    public address: string;
    public imagePath: string;
}
