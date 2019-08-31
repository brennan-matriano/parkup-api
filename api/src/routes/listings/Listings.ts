import { ListingDao, ReservationDao } from '@daos';
import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK, UNAUTHORIZED } from 'http-status-codes';
import middleware from  '../../middleware/auth';

const router = Router();
const path = '/listings';

export const listingDao = new ListingDao();
export const reservationDao = new ReservationDao();

export const getListingPath: string= '/:id';
router.get(getListingPath, async (req: Request, res: Response) => {
    try {
        const [listing, reservations] =  await Promise.all([listingDao.getOne(Number(req.params.id)),reservationDao.getAllDatesForListing(Number(req.params.id))])
        listing.reservations = reservations;
        return res.status(OK).json({listing,reservations});
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

export const getListingsForUser: string= '/user/:id';
router.get(getListingsForUser, async (req: Request, res: Response) => {
    try {
        const listings =  await listingDao.getAllForUser(Number(req.params.id)) ;
        return res.status(OK).json({listings});
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

export const newListingReservationPath: string= '/:id/reservations';
router.post(newListingReservationPath, async (req: Request, res: Response) => {
    try {
        const reservation = req.body;
        reservation.UserId = req.body.currentUserId;
        reservation.ListingId = Number(req.params.id);
        if (!reservation) {
            return res.status(BAD_REQUEST).json({
                error: listingMissingErr,
            });
        }
        let createdReservation = await reservationDao.add(reservation);
        return res.status(CREATED).json(createdReservation);
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

export const getListingReservationPath: string= '/:id/reservations';
router.get(getListingReservationPath, middleware.AuthRequired, async (req: Request, res: Response) => {
    try {
        const [listing, reservations] =  await Promise.all([listingDao.getOne(Number(req.params.id)),reservationDao.getAllForListing(Number(req.params.id))]);
        if(listing.UserId!=req.body.currentUserId){
            return res.status(UNAUTHORIZED).json({
                error: 'Signup as the owner of this listing to perform this action.'
            })
        }
        return res.status(OK).json({reservations});
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

export const searchListingPath: string= '/search';
router.post(searchListingPath, async (req: Request, res: Response) => {
    try {
        const listing = await listingDao.search(req.body);
        return res.status(OK).json({listing});
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

export const getListingsPath: string= '/';
router.get(getListingsPath, async (req: Request, res: Response) => {
    try {
        const listings = await listingDao.getAll();
        return res.status(OK).json({listings});
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

export const addListingPath: string= '/';
export const listingMissingErr = 'Listing property was not present for adding listing route.';
router.post(addListingPath, middleware.AuthRequired, async (req: Request, res: Response) => {
    try {
        const listing = req.body;
        listing.isActive = true;
        listing.requireApproval = false;
        listing.timeAvailabilityStart = '00:00';
        listing.timeAvailabilityEnd = '23:59'
        listing.UserId = req.body.currentUserId;
        if (!listing) {
            return res.status(BAD_REQUEST).json({
                error: listingMissingErr,
            });
        }
        let createdListing = await listingDao.add(listing);
        return res.status(CREATED).json(createdListing);
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});


export const updateListingPath: string= '/:id';
export const listingUpdateMissingErr = 'Listing property was not present for updating listing route.';
export const idUpdateMissingErr = 'No target selected to update.';
export const updateFailedErr = 'Target was not updated. Please try again';
router.put(updateListingPath, middleware.AuthRequired, async (req: Request, res: Response) => {
    try {
        const changes = req.body;
        const id = Number(req.params.id);        
        const listing = await listingDao.getOne(id);
        if(listing.UserId!=req.body.currentUserId){
            return res.status(UNAUTHORIZED).json({
                error: 'Signup as the owner of this listing to perform this action.'
            })
        }
        if (!changes) {
            return res.status(BAD_REQUEST).json({
                error: listingUpdateMissingErr,
            });
        }
        if (!id) {
            return res.status(BAD_REQUEST).json({
                error: idUpdateMissingErr,
            });
        }
        let updated: number[] = await listingDao.update(changes, Number(id));
        if (!updated) {
            return res.status(BAD_REQUEST).json({
                error: updateFailedErr,
            });
        }
        return res.status(OK).json(updated);
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

export const deleteListingPath: string= '/delete/:id';
router.delete(deleteListingPath, middleware.AuthRequired, async (req: Request, res: Response) => {
    try {
        const listing = await listingDao.getOne(Number(req.params.id));
        if(listing.UserId!=req.body.currentUserId){
            return res.status(UNAUTHORIZED).json({
                error: 'Signup as the owner of this listing to perform this action.'
            })
        }
        let deleteResult = await listingDao.delete(Number(req.params.id));
        return res.status(OK).json(deleteResult);
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

export default { router, path };