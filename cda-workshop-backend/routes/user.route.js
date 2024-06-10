import { Router } from 'express';
import userController from '../controllers/userController.js';
import {
  verifyToken,
  verifyPassword,
  verifyTokenWitoutNext,
} from '../utils/auth.js';

import { isAdmin, isEmployee, isNotStudent } from '../utils/authorization.js';

const router = Router();
const userControll = new userController();

router.post('/login', userControll.findNameForLogin, verifyPassword);
router.post('/register', verifyToken, isNotStudent, userControll.add);
router.post('/verifytoken', verifyTokenWitoutNext);

router.get('/filter', userControll.filter);
router.get('/', userControll.browse);

router.get('/:id', userControll.read);
router.put('/:id', verifyToken, isNotStudent, userControll.edit);
router.delete('/:id', verifyToken, isNotStudent, userControll.destroy);

export default router;
