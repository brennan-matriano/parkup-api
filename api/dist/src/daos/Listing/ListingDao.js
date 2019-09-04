"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const models_1 = require("../../../models");
const UserDao_1 = require("../User/UserDao");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
class ListingDao {
    constructor() {
        this.Listing = models_1.db['Listing'];
    }
    getAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Listing.findAll();
        });
    }
    getUnavailableDates() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    getAllAvailable() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Listing.findAll({ where: { isActive: true } });
        });
    }
    getAllUnavailable() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Listing.findAll({ where: { isActive: false } });
        });
    }
    search(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let conditions = [];
            if (query.description) {
                let descriptionConditions = [];
                let tokens = query.description.split(' ');
                for (let token of tokens) {
                    descriptionConditions.push({ description: { [Op.like]: '%' + token + '%' } });
                }
                conditions.push({ [Op.or]: [descriptionConditions] });
            }
            if (query.owner) {
                let Users = new UserDao_1.UserDao();
                let ownerConditions = [];
                let similarUsers = yield Users.getAllSimilarName(query.owner);
                for (let user of similarUsers) {
                    ownerConditions.push({ owner: user.id });
                }
                conditions.push({ [Op.or]: [ownerConditions] });
            }
            if (query.pphLowerLimit) {
                conditions.push({ pricePerHour: { [Op.gte]: query.pphLowerLimit } });
            }
            if (query.pphUpperLimit) {
                conditions.push({ pricePerHour: { [Op.lte]: query.pphUpperLimit } });
            }
            if (query.timeAvailabilityStart) {
                conditions.push({ timeAvailabilityStart: { [Op.lte]: query.timeAvailabilityStart } });
            }
            if (query.timeAvailabilityEnd) {
                conditions.push({ timeAvailabilityEnd: { [Op.gte]: query.timeAvailabilityEnd } });
            }
            if (query.dateAvailabilityStart) {
                conditions.push({ timeAvailabilityStart: { [Op.lte]: query.dateAvailabilityStart } });
            }
            if (query.dateAvailabilityStart) {
                conditions.push({ timeAvailabilityEnd: { [Op.gte]: query.dateAvailabilityEnd } });
            }
            if (query.isActiveOnly === true) {
                conditions.push({ isActive: true });
            }
            else if (query.isActiveOnly === false) {
                conditions.push({ isActive: false });
            }
            let ORMQuery = { where: { [Op.and]: [conditions] } };
            return this.Listing.findAll(ORMQuery);
        });
    }
    getOne(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Listing.findOne({ where: { id: id }, include: [models_1.db['User']] });
        });
    }
    getAllForUser(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Listing.findAll({ where: { UserId: id } });
        });
    }
    update(changes, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Listing.update(changes, {
                where: {
                    id: id,
                },
            });
        });
    }
    add(listing) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
            });
        });
    }
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Listing.update({ isActive: false }, {
                where: {
                    id: id,
                },
                fields: {
                    exclude: [
                        'createdAt',
                        'updatedAt'
                    ]
                }
            });
        });
    }
}
exports.ListingDao = ListingDao;
