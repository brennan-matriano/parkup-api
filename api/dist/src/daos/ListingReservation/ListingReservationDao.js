"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const models_1 = require("../../../models");
class ReservationDao {
    constructor() {
        this.Reservation = models_1.db['Reservation'];
    }
    getAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Reservation.findAll();
        });
    }
    getAllAvailable() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Reservation.findAll({ where: { isActive: true } });
        });
    }
    getAllUnavailable() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Reservation.findAll({ where: { isActive: false } });
        });
    }
    getOne(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Reservation.findOne({ where: { id: id } });
        });
    }
    getAllForListing(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Reservation.findAll({ where: { ListingId: id } });
        });
    }
    getAllDatesForListing(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Reservation.findAll({
                attributes: ['startDate', 'endDate'],
                where: { ListingId: id }
            });
        });
    }
    update(changes, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Reservation.update(changes, {
                where: {
                    id: id,
                },
            });
        });
    }
    add(listing) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Reservation.create(listing, {
                fields: [
                    'startDate',
                    'endDate',
                    'isAccepted',
                    'price',
                    'UserId',
                    'ListingId'
                ]
            });
        });
    }
}
exports.ReservationDao = ReservationDao;
