import { Router, RequestHandler  } from 'express';
import * as userCtrl from '../controllers/user';

const router = Router();

router.post('/', userCtrl.saveUser);

router.post('/login', userCtrl.login);

export default router;