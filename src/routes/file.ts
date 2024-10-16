import { Router, RequestHandler  } from 'express';
import * as fileCtrl from '../controllers/file';
import * as multerMiddleware from '../middleware/multer';
import * as jwtMiddleware from '../middleware/jwt';

const router = Router();

router.post('/', [jwtMiddleware.jwtVerify,multerMiddleware.uploadImage], fileCtrl.saveImage);

export default router;