import User from '../models/User.js';

export const UserController = {
    CreateLogin: async (req,res) => {
        try{
            const {login,password} = req.body;
            const user = new  User({login, password});
            await user.save();
            res.status(201).json({user});
        } catch (err){
            res.status(500).json({message: "Error creating user"})
        }
    },
}
