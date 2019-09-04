"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _daos_1 = require("@daos");
const _shared_1 = require("@shared");
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const router = express_1.Router();
const path = '/contact-us';
exports.contactUsMessageDao = new _daos_1.ContactUsMessageDao();
exports.addMessagePath = '/';
router.post(exports.addMessagePath, (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    try {
        console.log(req.body);
        let message = req.body.message;
        let createdMessage = yield exports.contactUsMessageDao.add(message);
        return res.status(http_status_codes_1.CREATED).json(createdMessage);
    }
    catch (err) {
        _shared_1.logger.error(err.message, err);
        return res.status(http_status_codes_1.BAD_REQUEST).json({
            error: err.message,
        });
    }
}));
exports.default = { router, path };
