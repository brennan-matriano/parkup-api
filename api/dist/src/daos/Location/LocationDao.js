"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const models_1 = require("../../../models");
class LocationDao {
    constructor() {
        this.Location = models_1.db['Location'];
    }
    getAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Location.findAll();
        });
    }
    getOne(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Location.findOne({ where: { id: id } });
        });
    }
    update(changes, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Location.update(changes, {
                where: {
                    id: id,
                },
            });
        });
    }
    add(location) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Location.create(location, {
                fields: [
                    'name',
                    'maxCapacity',
                    'description',
                ]
            });
        });
    }
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Location.update({ isActive: false }, {
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
exports.LocationDao = LocationDao;
