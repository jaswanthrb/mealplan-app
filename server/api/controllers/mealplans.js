/* eslint-disable camelcase */

import MealPlan from "../models/mealplans.js";



const addMealPlan = async (req, res) => {
    try {
        const { user_id } = req.verified; 
        const { week, meals } = req.body;

        const meal = meals[0];

    
        let mealPlan = await MealPlan.findOne({user_id, week});
        if (!mealPlan) {
            mealPlan = await MealPlan.create({
                user_id,
                week,
                meals: [meal],
            });
            return res.json(mealPlan); 
        }


        if (mealPlan.meals.length >= 3) {
            return res.status(400).json({ error: 'Meal plan already contains 3 meals.' });
        }

        mealPlan.meals.push(meal);
        await mealPlan.save();

        res.json(mealPlan);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

const deleteMealPlan = async (req, res) => {
    try {
        const { user_id }= req.verified;
        const { id } = req.params;


        


        const deletedMealPlan = await MealPlan.findOneAndDelete({_id: id,user_id});
        

        if (!deletedMealPlan) {
            return res.status(404).json({ message: 'MealPlan not found' });
        }

        res.json({ _id: id, message: 'Delete success' });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

export { addMealPlan, deleteMealPlan };