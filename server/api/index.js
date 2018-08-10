import express from 'express';
import Controller from './controllers';

const router = express.Router();

router.get('/user', Controller.fetchUser);
router.get('/product', Controller.fetchProduct);

export default router;