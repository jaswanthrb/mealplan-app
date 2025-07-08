/* eslint-disable camelcase */
import axios from 'axios';

import User from '../models/users.js';

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;
const SPOONACULAR_API_URL = process.env.SPOONACULAR_API_URL;

const searchMeals = async (req, res) => {
    try {
        const { meal, diets } = req.query;  
        const { user_id } = req.verified;

        const user = await User.findOne({ _id: user_id });
        const dietPreferences = user ? user.preferences : [];

        const meals = await axios.get(`${SPOONACULAR_API_URL}/recipes/complexSearch`, {
            params: {
                apiKey: SPOONACULAR_API_KEY,
                query: meal,
                diets: diets || (dietPreferences.length > 0 ? dietPreferences.join(',') : null)
            }
        });



        res.json(meals.data.results);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

export { searchMeals };