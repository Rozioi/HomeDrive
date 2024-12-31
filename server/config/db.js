const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017/Cloud', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully');
    } catch (e) {
        console.error('MongoDB connection error: ', e.message);
        process.exit(1);
    }
};

module.exports = connectDB;