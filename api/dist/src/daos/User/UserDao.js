"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const models_1 = require("../../../models");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
class UserDao {
    constructor() {
        this.User = models_1.db['User'];
    }
    getAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.User.findAll();
        });
    }
    getAllSimilarName(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let tokens = query.split(' ');
            let conditions = [];
            for (let token of tokens) {
                conditions.push({ firstName: { [Op.like]: '%' + token + '%' } });
                conditions.push({ lastName: { [Op.like]: '%' + token + '%' } });
            }
            return this.User.findAll({
                where: {
                    [Op.or]: [
                        conditions
                    ]
                }
            });
        });
    }
    getOne(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.User.findOne({ where: { id: id } });
        });
    }
    update(changes, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.User.update(changes, {
                where: {
                    id: id,
                },
                fields: { exclude: ['password', 'passwordResetToken', 'verified', 'createdAt', 'updatedAt'] },
            });
        });
    }
    add(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.User.create(user, {
                fields: [
                    'id',
                    'firstName',
                    'lastName',
                    'password',
                    'email'
                ]
            });
        });
    }
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.User.update({ isActive: false }, {
                where: {
                    id: id,
                },
                fields: {
                    exclude: [
                        'password',
                        'passwordResetToken',
                        'isVerified',
                        'createdAt',
                        'updatedAt'
                    ]
                }
            });
        });
    }
}
exports.UserDao = UserDao;
