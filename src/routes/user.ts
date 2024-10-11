import { Router, RequestHandler  } from 'express';
import * as userCtrl from '../controllers/user';

const router = Router();

router.post('/', userCtrl.saveUser);

export default router;