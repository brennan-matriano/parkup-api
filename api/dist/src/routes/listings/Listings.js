"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _daos_1 = require("@daos");
const _shared_1 = require("@shared");
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const auth_1 = tslib_1.__importDefault(require("../../middleware/auth"));
const router = express_1.Router();
const path = '/listings';
exports.listingDao = new _daos_1.ListingDao();
exports.reservationDao = new _daos_1.ReservationDao();
exports.getListingPath = '/:id';
router.get(exports.getListingPath, (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    try {
        const [listing, reservations] = yield Promise.all([exports.listingDao.getOne(Number(req.params.id)), exports.reservationDao.getAllDatesForListing(Number(req.params.id))]);
        listing.reservations = reservations;
        return res.status(http_status_codes_1.OK).json({ listing, reservations });
    }
    catch (err) {
        _shared_1.logger.error(err.message, err);
        return res.status(http_status_codes_1.BAD_REQUEST).json({
            error: err.message,
        });
    }
}));
exports.getListingsForUser = '/user/:id';
router.get(exports.getListingsForUser, (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    try {
        const listings = yield exports.listingDao.getAllForUser(Number(req.params.id));
        return res.status(http_status_codes_1.OK).json({ listings });
    }
    catch (err) {
        _shared_1.logger.error(err.message, err);
        return res.status(http_status_codes_1.BAD_REQUEST).json({
            error: err.message,
        });
    }
}));
exports.newListingReservationPath = '/:id/reservations';
router.post(exports.newListingReservationPath, (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    try {
        const reservation = req.body;
        reservation.UserId = req.body.currentUserId;
        reservation.ListingId = Number(req.params.id);
        if (!reservation) {
            return res.status(http_status_codes_1.BAD_REQUEST).json({
                error: exports.listingMissingErr,
            });
        }
        let createdReservation = yield exports.reservationDao.add(reservation);
        return res.status(http_status_codes_1.CREATED).json(createdReservation);
    }
    catch (err) {
        _shared_1.logger.error(err.message, err);
        return res.status(http_status_codes_1.BAD_REQUEST).json({
            error: err.message,
        });
    }
}));
exports.getListingReservationPath = '/:id/reservations';
router.get(exports.getListingReservationPath, auth_1.default.AuthRequired, (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    try {
        const [listing, reservations] = yield Promise.all([exports.listingDao.getOne(Number(req.params.id)), exports.reservationDao.getAllForListing(Number(req.params.id))]);
        if (listing.UserId != req.body.currentUserId) {
            return res.status(http_status_codes_1.UNAUTHORIZED).json({
                error: 'Signup as the owner of this listing to perform this action.'
            });
        }
        return res.status(http_status_codes_1.OK).json({ reservations });
    }
    catch (err) {
        _shared_1.logger.error(err.message, err);
        return res.status(http_status_codes_1.BAD_REQUEST).json({
            error: err.message,
        });
    }
}));
exports.searchListingPath = '/search';
router.post(exports.searchListingPath, (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    try {
        const listing = yield exports.listingDao.search(req.body);
        return res.status(http_status_codes_1.OK).json({ listing });
    }
    catch (err) {
        _shared_1.logger.error(err.message, err);
        return res.status(http_status_codes_1.BAD_REQUEST).json({
            error: err.message,
        });
    }
}));
exports.getListingsPath = '/';
router.get(exports.getListingsPath, (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    try {
        const listings = yield exports.listingDao.getAll();
        return res.status(http_status_codes_1.OK).json({ listings });
    }
    catch (err) {
        _shared_1.logger.error(err.message, err);
        return res.status(http_status_codes_1.BAD_REQUEST).json({
            error: err.message,
        });
    }
}));
exports.addListingPath = '/';
exports.listingMissingErr = 'Listing property was not present for adding listing route.';
router.post(exports.addListingPath, auth_1.default.AuthRequired, (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    try {
        const listing = req.body;
        listing.isActive = true;
        listing.requireApproval = false;
        listing.timeAvailabilityStart = '00:00';
        listing.timeAvailabilityEnd = '23:59';
        listing.UserId = req.body.currentUserId;
        if (!listing) {
            return res.status(http_status_codes_1.BAD_REQUEST).json({
                error: exports.listingMissingErr,
            });
        }
        let createdListing = yield exports.listingDao.add(listing);
        return res.status(http_status_codes_1.CREATED).json(createdListing);
    }
    catch (err) {
        _shared_1.logger.error(err.message, err);
        return res.status(http_status_codes_1.BAD_REQUEST).json({
            error: err.message,
        });
    }
}));
exports.updateListingPath = '/:id';
exports.listingUpdateMissingErr = 'Listing property was not present for updating listing route.';
exports.idUpdateMissingErr = 'No target selected to update.';
exports.updateFailedErr = 'Target was not updated. Please try again';
router.put(exports.updateListingPath, auth_1.default.AuthRequired, (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    try {
        const changes = req.body;
        const id = Number(req.params.id);
        const listing = yield exports.listingDao.getOne(id);
        if (listing.UserId != req.body.currentUserId) {
            return res.status(http_status_codes_1.UNAUTHORIZED).json({
                error: 'Signup as the owner of this listing to perform this action.'
            });
        }
        if (!changes) {
            return res.status(http_status_codes_1.BAD_REQUEST).json({
                error: exports.listingUpdateMissingErr,
            });
        }
        if (!id) {
            return res.status(http_status_codes_1.BAD_REQUEST).json({
                error: exports.idUpdateMissingErr,
            });
        }
        let updated = yield exports.listingDao.update(changes, Number(id));
        if (!updated) {
            return res.status(http_status_codes_1.BAD_REQUEST).json({
                error: exports.updateFailedErr,
            });
        }
        return res.status(http_status_codes_1.OK).json(updated);
    }
    catch (err) {
        _shared_1.logger.error(err.message, err);
        return res.status(http_status_codes_1.BAD_REQUEST).json({
            error: err.message,
        });
    }
}));
exports.deleteListingPath = '/delete/:id';
router.delete(exports.deleteListingPath, auth_1.default.AuthRequired, (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    try {
        const listing = yield exports.listingDao.getOne(Number(req.params.id));
        if (listing.UserId != req.body.currentUserId) {
            return res.status(http_status_codes_1.UNAUTHORIZED).json({
                error: 'Signup as the owner of this listing to perform this action.'
            });
        }
        let deleteResult = yield exports.listingDao.delete(Number(req.params.id));
        return res.status(http_status_codes_1.OK).json(deleteResult);
    }
    catch (err) {
        _shared_1.logger.error(err.message, err);
        return res.status(http_status_codes_1.BAD_REQUEST).json({
            error: err.message,
        });
    }
}));
exports.default = { router, path };
