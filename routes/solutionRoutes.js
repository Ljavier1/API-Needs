import express from 'express';
import * as solutionController from './controllers/solutionController.js';

const router = express.Router();


router.get('/solutions/:taskId', solutionController.getSolutionsByTaskId);

router.post('/solutions', solutionController.createSolution);

router.put('/solutions/:id', solutionController.updateSolution);

router.delete('/solutions/:id', solutionController.deleteSolution);

export default router;
