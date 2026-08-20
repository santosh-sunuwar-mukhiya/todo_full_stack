import mongoose from 'mongoose'
import {config} from './env.js'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.dbUri);
        console.log(`MongoDB connected- HOST:${conn.connection.host}, PORT:${conn.connection.port}`);
    } catch (error) {
        console.log(`Error Occurred:${error}`);
        process.exit(1);
    }
}

export default connectDB;