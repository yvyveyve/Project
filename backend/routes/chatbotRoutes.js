import express from 'express';
import { processChat, getSuggestions } from '../controllers/chatbotController.js';

const router = express.Router();

router.post('/message', processChat);
router.get('/suggestions', getSuggestions);

export default router;
