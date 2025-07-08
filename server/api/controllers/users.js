/* eslint-disable camelcase */
import User from '../models/users.js';

import { hash, compare, signToken } from '../utils/auth.js';

const registerUser = async (req, res) => {
    try {
        const { username, password, preferences=[] } = req.body;

        // ensure both username and password are provided
        if (!username || !password) {
            return res.status(422).json({ error: 'Must provide both username and password' });
        }

        

        const hashedPassword = await hash(password);

        // add user to the Users collection
        const userEntry = await User.create({
            username,
            password: hashedPassword,
            preferences : preferences || [],
        });


        res.json({ _id: userEntry._id, username: userEntry.username, preferences: userEntry.preferences });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
        
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // ensure both username and password are in req.body
        if (!username || !password) {
            return res.status(422).json({ error: 'Must provide both username and password.' });
        }

        // find user by username and verify password

        const userEntry = await User.findOne({ username: username.toLowerCase() });
        
        if (!userEntry) {
            return res.status(401).json({ error: 'Invalid username.' });
        }

        const passwordEqual = await compare(password, userEntry.password);
        if (!passwordEqual) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = signToken(userEntry.username, userEntry._id);

        res.json({ _id: userEntry._id, username: userEntry.username, preferences: userEntry.preferences , token_type: 'Bearer', access_token: token});
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

const getUserById = async (req, res) => {
    try {
        const { user_id }= req.verified;
        const { id } = req.params;


        // ensure the user id in header matches id provided in URL
        if (id !== user_id) {
            return res.status(403).json({ error: 'Forbidden: You are not this user.' });
        }

    
        const userWithMealplans = await User.findById(id).select('-password').populate('mealPlans');
        
        res.json(userWithMealplans);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

const addPreference = async (req, res) => {
    try {
        const { user_id }= req.verified;
        const { id } = req.params;
        const { preferences } = req.body;


        if (id !== user_id) {
            return res.status(403).json({ error: 'Forbidden: You are not this user.' });
        }

        

        const user = await User.findById(user_id); 
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        user.preferences = preferences; 
        await user.save(); 

        res.json({
            
            name: user.username,
            preferences: user.preferences
        });

        
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

export { registerUser, loginUser, getUserById, addPreference };
