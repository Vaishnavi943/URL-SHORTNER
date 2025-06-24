import express from 'express';
const router = express.Router();
import { createShortUrl } from '../controller/short_url.controller.js';

// post
router.post("/", createShortUrl)


export default router;