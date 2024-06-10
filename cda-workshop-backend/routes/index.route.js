import { Router } from 'express';

const router = Router();
import user from './user.route.js';
import loan from './loan.route.js';
import author from './author.route.js';
import book from './book.route.js';

router.use('/users', user);
router.use('/loan', loan);
router.use('/book', book);
router.use('/author', author);

export default router;
