import { Router } from 'express';
import loanController from '../controllers/loanController.js';

const router = Router();
const loanControll = new loanController();

router.get('/filter', loanControll.filter);
router.get('/', loanControll.browse);
router.get('/:id', loanControll.read);
router.post('/', loanControll.add);
router.put('/:id', loanControll.edit);
router.delete('/:id', loanControll.destroy);

export default router;
