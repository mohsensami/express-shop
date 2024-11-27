import express from 'express';
import { getPosts, getPost } from '../controllers/post.controller.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:slug', getPost);

export default router;
