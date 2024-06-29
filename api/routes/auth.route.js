import express from 'express';
import { auth, signin } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/sign-up", auth);
router.post("/sign-in", signin);
export default router;