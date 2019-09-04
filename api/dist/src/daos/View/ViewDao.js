"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const models_1 = require("../../../models");
class ViewDao {
    constructor() {
        this.View = models_1.db['View'];
    }
    getAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.View.findAll();
        });
    }
    getOne(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.View.findOne({ where: { id: id } });
        });
    }
    update(changes, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.View.update(changes, {
                where: {
                    id: id,
                },
            });
        });
    }
    add(view) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.View.create(view, {
                fields: [
                    'name',
                    'displayType',
                ]
            });
        });
    }
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.View.update({ isActive: false }, {
                where: {
                    id: id,
                },
            });
        });
    }
}
exports.ViewDao = ViewDao;
