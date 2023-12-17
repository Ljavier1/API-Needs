import express from 'express';
import { getComments, createComment, deleteComment, createReply, getRepliesByCommentId } from './controllers/commentController.js';

const router = express.Router();

router.get('/:taskId', getComments);
router.get('/replies/:commentId', getRepliesByCommentId);
router.post('/:taskId', createComment);
router.delete('/:commentId', deleteComment);
router.post('/replies/:commentId', createReply);

export default router;

