import mongoose from "mongoose";

// {
//     _id: 1,
//     username: 'prof_auman',
//     password: 'future_hashed_password',
//     preferences: ['ketogenic']
// },


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        set: (username) => username.toLowerCase()
    },
    password:{
        type: String,
        required: true
    },
    preferences: [{
        type : String,
        default : []
    }]

    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

UserSchema.virtual('mealPlans', {
    ref: 'MealPlan',
    localField: '_id',
    foreignField: 'user_id'
});

const User = mongoose.model('User', UserSchema);

export default User;