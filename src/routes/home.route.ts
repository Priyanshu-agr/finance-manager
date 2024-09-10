import {Router} from 'express';
import {homeRoute} from '../controllers/home.controller';

const router = Router();

router.get('/',homeRoute);

export default router;