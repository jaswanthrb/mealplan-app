import express from 'express';

import { verifyUser } from '../middleware/authorization.js';

import {addMealPlan, deleteMealPlan} from '../controllers/mealplans.js'


const router = express.Router();

router.use(verifyUser);

// POST /mealplans
router.post('/', addMealPlan);

// DELETE /watchlist/:id
router.delete('/:id', deleteMealPlan);

export default router;
