import mongoose from 'mongoose';
 
const connectDB = async () => {
    try {
         await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log(`MongoDB connected successfully `);
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exit the process with failure
    }
}

export default connectDB;