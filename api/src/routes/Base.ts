import { Router } from 'express';
import UserRouter from './users/Users';
import ListingsRouter from './listings/Listings';
import UploadRouter from './image-upload/image-upload';
import AuthRouter from './auth/Auth';
import ContactUsRouter from './contactUs/contactUs';
import middleware from  '../middleware/auth';

// Init router and path
const router = Router();
const path = '/api';

// Add sub-routes
router.use(middleware.RefreshToken)
router.use(UserRouter.path, UserRouter.router);
router.use(ListingsRouter.path, ListingsRouter.router);
router.use(AuthRouter.path, AuthRouter.router);
router.use(UploadRouter.uploadPath, UploadRouter.router);
router.use(ContactUsRouter.path, ContactUsRouter.router);

// Export the base-router
export default { router, path };
