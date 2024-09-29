import express from 'express';
import Ai from '../controller/ai';

const router = express.Router();

router.post("/ask",Ai.ask);

export default router;