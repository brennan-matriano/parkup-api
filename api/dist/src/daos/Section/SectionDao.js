"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const models_1 = require("../../../models");
class SectionDao {
    constructor() {
        this.Section = models_1.db['Section'];
    }
    getAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Section.findAll();
        });
    }
    getOne(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Section.findOne({ where: { id: id } });
        });
    }
    update(changes, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Section.update(changes, {
                where: {
                    id: id,
                },
            });
        });
    }
    add(section) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Section.create(section, {
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
            return this.Section.update({ isActive: false }, {
                where: {
                    id: id,
                },
            });
        });
    }
}
exports.SectionDao = SectionDao;
