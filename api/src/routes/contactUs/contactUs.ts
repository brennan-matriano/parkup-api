import { ContactUsMessageDao } from '@daos';
import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';

const router = Router();
const path = '/contact-us';

export const contactUsMessageDao = new ContactUsMessageDao();

export const addMessagePath: string= '/';
router.post(addMessagePath, async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        let message = req.body.message;
        let createdMessage = await contactUsMessageDao.add(message);
        return res.status(CREATED).json(createdMessage);
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

export default { router, path };