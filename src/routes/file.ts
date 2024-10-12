import { Router, RequestHandler  } from 'express';
import * as fileCtrl from '../controllers/file';
import * as multerMiddleware from '../middleware/multer';

const router = Router();

router.post('/', [multerMiddleware.uploadImage], fileCtrl.saveImage);

export default router;