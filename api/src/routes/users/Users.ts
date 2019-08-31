import { UserDao } from '@daos';
import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';

const router = Router();
const path = '/users';

export const userDao = new UserDao();

export const getUserPath: string= '/:id';
router.get(getUserPath, async (req: Request, res: Response) => {
    try {
        const user = await userDao.getOne(req.params.id);
        return res.status(OK).json({user});
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

export const getUsersPath: string= '/';
router.get(getUsersPath, async (req: Request, res: Response) => {
    try {
        const users = await userDao.getAll();
        return res.status(OK).json({users});
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

export const addUserPath: string= '/';
export const userMissingErr = 'User property was not present for adding user route.';
router.post(addUserPath, async (req: Request, res: Response) => {
    try {
        const user = req.body;
        if (!user) {
            return res.status(BAD_REQUEST).json({
                error: userMissingErr,
            });
        }
        let createdUser = await userDao.add(user);
        return res.status(CREATED).json(createdUser);
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});


export const updateUserPath: string= '/:id';
export const userUpdateMissingErr = 'User property was not present for updating user route.';
export const idUpdateMissingErr = 'No target selected to update.';
export const updateFailedErr = 'Target was not updated. Please try again';
router.put(updateUserPath, async (req: Request, res: Response) => {
    try {
        const changes = req.body;
        const id = Number(req.params.id);        
        if (!changes) {
            return res.status(BAD_REQUEST).json({
                error: userUpdateMissingErr,
            });
        }
        if (!id) {
            return res.status(BAD_REQUEST).json({
                error: idUpdateMissingErr,
            });
        }
        let updated: number[] = await userDao.update(changes, Number(id));
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

export const deleteUserPath: string= '/delete/:id';
router.delete(deleteUserPath, async (req: Request, res: Response) => {
    try {
        let deleteResult = await userDao.delete(Number(req.params.id));
        return res.status(OK).json(deleteResult);
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

export default { router, path };