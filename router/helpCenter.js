import express from 'express';
import { createConcernRequest } from '../controllers/helpCenter.js'; 

const router = express.Router();

router.post('/create_concern/request', createConcernRequest); 

export default router;
