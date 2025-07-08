 // mealplans: [
//     {
//         _id: 1,
//         user_id: 1,
//         week: 1,
//         meals: [
//             {
//                 mealId: 1591791,
//                 name: 'Keto Snickerdoodle Coffee',
//                 diets: ['gluten free', 'lacto ovo vegetarian', 'primal', 'ketogenic'],
//                 image: 'https://img.spoonacular.com/recipes/1591791-312x231.jpg'
//             }
//         ]
//     },

import mongoose from 'mongoose';

const MealPlanSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    week: {
        type: Number,
        required: true
    },
    meals: [{
        mealId: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        diets: [{
            type: String,
            required: true
        }],
        image: {
            type: String,
            required: true
        }
    }]
});



const MealPlan = mongoose.model('MealPlan', MealPlanSchema);

export default MealPlan;

