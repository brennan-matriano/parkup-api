const usingMockDb = (process.env.USE_MOCK_DB || '').toLowerCase();
let userDaoPath = './User/UserDao';
let listingDaoPath = './Listing/ListingDao';
let locationDaoPath = './Location/LocationDao';
let sectionDaoPath = './Section/SectionDao';
let reservationDaoPath = './ListingReservation/ListingReservationDao';
let viewDaoPath = './View/ViewDao';
let contactUsMessageDaoPath = './ContactUsMessage/ContactUsMessageDao';

if (usingMockDb === 'true') {
    userDaoPath += '.mock';
}

// tslint:disable:no-var-requires
export const { UserDao } = require(userDaoPath);
export const { ListingDao } = require(listingDaoPath);
export const { LocationDao } = require(locationDaoPath);
export const { SectionDao } = require(sectionDaoPath);
export const { ViewDao } = require(viewDaoPath);
export const { ReservationDao } = require(reservationDaoPath)
export const { ContactUsMessageDao } = require(contactUsMessageDaoPath)