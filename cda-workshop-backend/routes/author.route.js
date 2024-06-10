import { Router } from 'express';
import authorController from '../controllers/authorController.js';

const router = Router();

const authorControll = new authorController();

router.get('/', authorControll.browse);
export default router;
