"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.UserDao = require(userDaoPath).UserDao;
exports.ListingDao = require(listingDaoPath).ListingDao;
exports.LocationDao = require(locationDaoPath).LocationDao;
exports.SectionDao = require(sectionDaoPath).SectionDao;
exports.ViewDao = require(viewDaoPath).ViewDao;
exports.ReservationDao = require(reservationDaoPath).ReservationDao;
exports.ContactUsMessageDao = require(contactUsMessageDaoPath).ContactUsMessageDao;
