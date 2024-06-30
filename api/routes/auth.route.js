import express from 'express';
import { auth, google, signin } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/sign-up", auth);
router.post("/sign-in", signin);
router.post("/google",google);
export default router;