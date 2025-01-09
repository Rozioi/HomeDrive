import mongoose from 'mongoose';

export const ConnectDB = async () => {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/Cloud', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully');
    } catch (e) {
        console.error('MongoDB connection error: ', e.message);
        process.exit(1);
    }
};

