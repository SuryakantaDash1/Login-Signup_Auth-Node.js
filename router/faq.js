import express from 'express';
import { createFaq, getFaq, getFaqById, removeFaq } from '../controllers/faq.js';

const router = express.Router();

router.post('/create_faq', createFaq);
router.get('/get_faq', getFaq);
router.get('/get_faqById/:id', getFaqById);
router.delete('/remove_faq/:id', removeFaq); 

export default router;
