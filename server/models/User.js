import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
},{collection: 'user'});

const User = mongoose.model('User', userSchema);

export default User;