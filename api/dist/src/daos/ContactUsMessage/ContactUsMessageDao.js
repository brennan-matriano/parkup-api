"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const models_1 = require("../../../models");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
class ContactUsMessageDao {
    constructor() {
        this.ContactUsMessage = models_1.db['ContactUsMessage'];
    }
    add(listing) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.ContactUsMessage.create(listing, {
                fields: [
                    'name',
                    'email',
                    'subject',
                    'message'
                ]
            });
        });
    }
}
exports.ContactUsMessageDao = ContactUsMessageDao;
