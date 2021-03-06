"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const Users_1 = tslib_1.__importDefault(require("./users/Users"));
const Listings_1 = tslib_1.__importDefault(require("./listings/Listings"));
const image_upload_1 = tslib_1.__importDefault(require("./image-upload/image-upload"));
const Auth_1 = tslib_1.__importDefault(require("./auth/Auth"));
const contactUs_1 = tslib_1.__importDefault(require("./contactUs/contactUs"));
const auth_1 = tslib_1.__importDefault(require("../middleware/auth"));
const router = express_1.Router();
const path = '/api';
router.use(auth_1.default.RefreshToken);
router.use(Users_1.default.path, Users_1.default.router);
router.use(Listings_1.default.path, Listings_1.default.router);
router.use(Auth_1.default.path, Auth_1.default.router);
router.use(image_upload_1.default.uploadPath, image_upload_1.default.router);
router.use(contactUs_1.default.path, contactUs_1.default.router);
exports.default = { router, path };
