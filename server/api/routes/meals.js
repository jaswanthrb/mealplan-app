
import express from 'express';

import { verifyUser } from '../middleware/authorization.js';


import { searchMeals } from '../controllers/meals.js';

const router = express.Router();



// GET /meals/meals?title=
router.get('/search', verifyUser, searchMeals);

export default router;