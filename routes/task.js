import express from 'express';
import { newTask, getMyTask, updateMyTask, deleteMyTask } from '../controllers/task.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.post('/new', isAuthenticated,  newTask);
router.get('/my', isAuthenticated, getMyTask);

router.route("/:id").put( isAuthenticated, updateMyTask).delete( isAuthenticated, deleteMyTask);

export default router;